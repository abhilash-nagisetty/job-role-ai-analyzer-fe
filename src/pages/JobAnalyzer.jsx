import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/JobAnalyzer.css';

function JobRoleAnalyzer() {
  const [jobRole, setJobRole] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef();
  // const printRef = useRef();

  // Add classes for status and risk
  const getStatusClass = (status) => {
    if (status === 'High Risk') return 'high-risk';
    if (status === 'Medium Risk') return 'medium-risk';
    return 'low-risk';
  };

  // Add progress bar animations on result change
  useEffect(() => {
    if (result) {
      // Add animation for risk percentage
      const riskFill = document.querySelector('.risk-fill');
      const confidenceFill = document.querySelector('.confidence-fill');
      
      if (riskFill) {
        setTimeout(() => {
          riskFill.style.width = `${result.percentage_replaced}%`;
        }, 300);
      }
      
      if (confidenceFill) {
        setTimeout(() => {
          confidenceFill.style.width = `${result.confidence_score}%`;
        }, 500);
      }
    }
  }, [result]);

  const handleAnalyze = async () => {
    if (!jobRole.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://job-role-ai-analyzer-be.onrender.com/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_role: jobRole }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error analyzing job role: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    // Create a print-friendly version of the content without shadows and with document formatting
    const printElement = document.createElement('div');
    printElement.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="text-align: center; margin-bottom: 20px;">Job Analysis Report: ${jobRole}</h2>
        <hr style="margin: 15px 0;" />
        
        <h3>Category: ${result.category}</h3>
        <p><strong>Status:</strong> ${result.status}</p>
        <p><strong>Risk:</strong> ${result.risk}</p>
        <p><strong>Replacement Chance:</strong> ${result.percentage_replaced}%</p>
        <p><strong>Confidence Score:</strong> ${result.confidence_score}%</p>
        
        <hr style="margin: 15px 0;" />
        <h3>Career Advice</h3>
        <p>${result.career_advice}</p>
        
        <h3>Skills Needed for Future</h3>
        <ul>
          ${result.skills_needed_for_future.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
        
        <h3>Skills Likely to be Automated</h3>
        <ul>
          ${result.skills_automated_in_job.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
        
        <h3>Job Market Trends</h3>
        <ul>
          ${Object.entries(result.job_market_trends).map(([year, trend]) => `<li><strong>${year}:</strong> ${trend}</li>`).join('')}
        </ul>
        
        <h3>Future Outlook</h3>
        <ul>
          ${Object.entries(result.future_outlook).map(([year, percent]) => `<li><strong>${year}:</strong> ${percent}% risk</li>`).join('')}
        </ul>
        
        <h3>Similar Safe Jobs</h3>
        <ul>
          ${result.similar_safe_jobs.map(job => `<li>${job}</li>`).join('')}
        </ul>
        
        <hr style="margin: 15px 0;" />
        <p style="text-align: center; font-size: 12px; margin-top: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
    `;
    
    document.body.appendChild(printElement);
    
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${jobRole.replace(/\s+/g, '_')}_analysis.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2,
        removeContainer: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };
    
    html2pdf()
      .from(printElement)
      .set(options)
      .save()
      .then(() => {
        // Remove the temporary element after PDF is generated
        document.body.removeChild(printElement);
      });
  };

  return (
    <div className="analyzer-container">
      <h2>Job Role Analyzer</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter job role (e.g., Software Developer, Data Scientist)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button onClick={handleAnalyze}>
          {loading ? <div className="loading"></div> : 'Analyze'}
        </button>
      </div>

      {result && (
        <div className="result-section" ref={resultRef}>
          <h3>📌 Category: {result.category}</h3>
          <p>
            <strong>Status:</strong> 
            <span className={getStatusClass(result.status)}>{result.status}</span>
          </p>
          <p><strong>Risk:</strong> {result.risk}</p>
          
          <p>
            <strong>Replacement Chance:</strong> {result.percentage_replaced}%
            <div className="progress-bar">
              <div className="progress-fill risk-fill"></div>
            </div>
          </p>
          
          <p>
            <strong>Confidence Score:</strong> {result.confidence_score}%
            <div className="progress-bar">
              <div className="progress-fill confidence-fill"></div>
            </div>
          </p>

          <h4>🧭 Career Advice</h4>
          <p>{result.career_advice}</p>

          <h4>🧠 Skills Needed for Future</h4>
          <ul>
            {result.skills_needed_for_future.map((skill, idx) => (
              <li key={idx}>✅ {skill}</li>
            ))}
          </ul>

          <h4>🤖 Skills Likely to be Automated</h4>
          <ul>
            {result.skills_automated_in_job.map((skill, idx) => (
              <li key={idx}>⚙️ {skill}</li>
            ))}
          </ul>

          <h4>📈 Job Market Trends</h4>
          <ul>
            {Object.entries(result.job_market_trends).map(([year, trend], idx) => (
              <li key={idx}><strong>{year}:</strong> {trend}</li>
            ))}
          </ul>

          <h4>🔮 Future Outlook</h4>
          <ul>
            {Object.entries(result.future_outlook).map(([year, percent], idx) => (
              <li key={idx}><strong>{year}:</strong> {percent}% risk</li>
            ))}
          </ul>

          <h4>🛡️ Similar Safe Jobs</h4>
          <ul className="safe-jobs">
            {result.similar_safe_jobs.map((job, idx) => (
              <li key={idx}>🧩 {job}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <button className="download-btn" onClick={handleDownloadPDF}>
          ⬇️ Download PDF
        </button>
      )}
    </div>
  );
}

export default JobRoleAnalyzer;