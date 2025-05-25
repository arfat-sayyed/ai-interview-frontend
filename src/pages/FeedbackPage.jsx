import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function FeedbackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/${id}`);
      setFeedback(response.data.feedback);
      setInterview(response.data.interview);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to load feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    return 'danger';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Generating your feedback...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col lg={10} className="mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h2>Interview Feedback</h2>
            <p className="text-muted">
              {interview?.position} 
              {interview?.company && ` at ${interview.company}`}
            </p>
          </div>

          {/* Interview Summary */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <h6 className="text-muted">Duration</h6>
                  <h4>{interview?.duration || 0} minutes</h4>
                </Col>
                <Col md={4} className="text-center">
                  <h6 className="text-muted">Questions Asked</h6>
                  <h4>{interview?.questionsAsked || 0}</h4>
                </Col>
                <Col md={4} className="text-center">
                  <h6 className="text-muted">Overall Rating</h6>
                  <h4>
                    <Badge bg={getScoreColor(feedback?.overallRating)} className="px-3 py-2">
                      {feedback?.overallRating}/10
                    </Badge>
                  </h4>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Detailed Scores */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Detailed Scores</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-4">
                <Col md={6}>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Technical Skills</span>
                      <Badge bg={getScoreColor(feedback?.technicalScore)}>
                        {getScoreLabel(feedback?.technicalScore)}
                      </Badge>
                    </div>
                    <ProgressBar 
                      now={feedback?.technicalScore * 10} 
                      variant={getScoreColor(feedback?.technicalScore)}
                      label={`${feedback?.technicalScore}/10`}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Communication</span>
                      <Badge bg={getScoreColor(feedback?.communicationScore)}>
                        {getScoreLabel(feedback?.communicationScore)}
                      </Badge>
                    </div>
                    <ProgressBar 
                      now={feedback?.communicationScore * 10} 
                      variant={getScoreColor(feedback?.communicationScore)}
                      label={`${feedback?.communicationScore}/10`}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Problem Solving</span>
                      <Badge bg={getScoreColor(feedback?.problemSolving)}>
                        {getScoreLabel(feedback?.problemSolving)}
                      </Badge>
                    </div>
                    <ProgressBar 
                      now={feedback?.problemSolving * 10} 
                      variant={getScoreColor(feedback?.problemSolving)}
                      label={`${feedback?.problemSolving}/10`}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Culture Fit</span>
                      <Badge bg={getScoreColor(feedback?.cultureFit)}>
                        {getScoreLabel(feedback?.cultureFit)}
                      </Badge>
                    </div>
                    <ProgressBar 
                      now={feedback?.cultureFit * 10} 
                      variant={getScoreColor(feedback?.cultureFit)}
                      label={`${feedback?.cultureFit}/10`}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Strengths and Improvements */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Strengths</h5>
                </Card.Header>
                <Card.Body>
                  <ul className="mb-0">
                    {feedback?.strengths?.map((strength, index) => (
                      <li key={index} className="mb-2">{strength}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-warning">
                  <h5 className="mb-0">Areas for Improvement</h5>
                </Card.Header>
                <Card.Body>
                  <ul className="mb-0">
                    {feedback?.improvements?.map((improvement, index) => (
                      <li key={index} className="mb-2">{improvement}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Detailed Feedback */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Detailed Feedback</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-0">{feedback?.detailedFeedback}</p>
            </Card.Body>
          </Card>

          {/* Next Steps */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Recommended Next Steps</h5>
            </Card.Header>
            <Card.Body>
              <ol className="mb-0">
                {feedback?.nextSteps?.map((step, index) => (
                  <li key={index} className="mb-2">{step}</li>
                ))}
              </ol>
            </Card.Body>
          </Card>

          {/* Resources */}
          {feedback?.recommendations && feedback.recommendations.length > 0 && (
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Recommended Resources</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  {feedback.recommendations.map((resource, index) => (
                    <li key={index} className="mb-2">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}

          {/* Actions */}
          <div className="text-center mt-5">
            <Link to="/">
              <Button variant="primary" size="lg" className="me-3">
                Back to Home
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline-primary" size="lg">
                Start New Interview
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FeedbackPage;