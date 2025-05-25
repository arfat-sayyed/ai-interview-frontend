import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function UploadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    resume: null,
    position: '',
    company: '',
    jobDescription: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resume: file });
      setError('');
    } else {
      setError('Please upload a PDF file');
      e.target.value = null; // Reset file input
    }
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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">Start New Interview</h2>
          
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Resume Upload</Card.Title>
                <Card.Text className="text-muted">
                  Upload your resume in PDF format (max 10MB)
                </Card.Text>
                <Form.Group>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    disabled={loading}
                  />
                  {formData.resume && (
                    <small className="text-success mt-2 d-block">
                      ✓ {formData.resume.name} selected
                    </small>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Job Details</Card.Title>
                
                <Form.Group className="mb-3">
                  <Form.Label>Position Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company Name (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Google"
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Job Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    placeholder="Paste the full job description here..."
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Starting Interview...
                </>
              ) : (
                'Start Interview'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UploadPage;