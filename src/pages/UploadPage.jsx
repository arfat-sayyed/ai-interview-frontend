import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { 
  Upload, 
  FileText, 
  Briefcase, 
  Building2, 
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function UploadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    resume: null,
    position: '',
    company: '',
    jobDescription: '',
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resume: file });
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.resume || !formData.position || !formData.jobDescription) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('resume', formData.resume);
      data.append('position', formData.position);
      data.append('company', formData.company);
      data.append('jobDescription', formData.jobDescription);

      const response = await axios.post(`${API_URL}/interviews/start`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Interview started:', response.data);
      navigate(`/interview/${response.data.interviewId}`);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Failed to start interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Header */}
            <div className="mb-4">
              <Link to="/" className="text-decoration-none">
                <Button variant="link" className="p-0 mb-3 text-decoration-none">
                  <ArrowLeft size={20} className="me-2" />
                  Back to Home
                </Button>
              </Link>
              
              <div className="text-center mb-5">
                <div className="upload-badge mb-3">
                  <Sparkles size={16} className="me-1" />
                  New Interview Session
                </div>
                <h1 className="display-5 fw-bold mb-3">
                  Let's Start Your
                  <span className="gradient-text"> AI Interview</span>
                </h1>
                <p className="text-muted lead">
                  Upload your resume and provide job details to begin your personalized interview experience
                </p>
              </div>
            </div>
            
            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError('')}
                className="glass-alert mb-4"
              >
                <AlertCircle size={18} className="me-2" />
                {error}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              {/* Resume Upload Card */}
              <Card className="mb-4 upload-card glassmorphism">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper me-3">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold">Resume Upload</h5>
                      <p className="text-muted small mb-0">Upload your resume in PDF format (max 10MB)</p>
                    </div>
                  </div>

                  <Form.Group
                    className={`upload-zone ${dragActive ? 'drag-active' : ''} ${formData.resume ? 'has-file' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      disabled={loading}
                      className="d-none"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="upload-label">
                      {formData.resume ? (
                        <div className="text-center">
                          <CheckCircle size={48} className="text-success mb-3" />
                          <p className="fw-bold mb-1">{formData.resume.name}</p>
                          <p className="text-muted small">Click to change file</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload size={48} className="text-muted mb-3" />
                          <p className="fw-bold mb-1">Drop your resume here</p>
                          <p className="text-muted small">or click to browse</p>
                        </div>
                      )}
                    </label>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Job Details Card */}
              <Card className="mb-4 job-details-card glassmorphism">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-wrapper me-3">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h5 className="mb-1 fw-bold">Job Details</h5>
                      <p className="text-muted small mb-0">Tell us about the position you're applying for</p>
                    </div>
                  </div>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium">
                          Position Title *
                        </Form.Label>
                        <div className="input-group-modern">
                          <span className="input-icon">
                            <Briefcase size={18} />
                          </span>
                          <Form.Control
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            placeholder="e.g., Senior Software Engineer"
                            required
                            disabled={loading}
                            className="modern-input"
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium">
                          Company Name (Optional)
                        </Form.Label>
                        <div className="input-group-modern">
                          <span className="input-icon">
                            <Building2 size={18} />
                          </span>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="e.g., Google"
                            disabled={loading}
                            className="modern-input"
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">
                      Job Description *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Paste the full job description here..."
                      required
                      disabled={loading}
                      className="modern-textarea"
                    />
                    <small className="text-muted">
                      {formData.jobDescription.length} characters
                    </small>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-100 submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Preparing Your Interview...
                  </>
                ) : (
                  <>
                    Start AI Interview
                    <ChevronRight size={20} className="ms-2" />
                  </>
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UploadPage;