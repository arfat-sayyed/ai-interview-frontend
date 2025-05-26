/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, ProgressBar } from 'react-bootstrap';
import { 
  Trophy, 
  Target, 
  MessageSquare, 
  Puzzle, 
  Users, 
  Clock, 
  MessageCircle,
  TrendingUp,
  Award,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  Download,
  Share2,
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';
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

  const getScoreGradient = (score) => {
    if (score >= 8) return 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)';
    if (score >= 6) return 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)';
    return 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-animation mb-4">
            <Sparkles size={48} className="text-primary" />
          </div>
          <Spinner animation="border" role="status" className="mb-3" style={{ color: '#667eea' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h5 className="text-muted">Analyzing your interview performance...</h5>
          <p className="text-muted small">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="glass-alert">
          <AlertTriangle size={20} className="me-2" />
          {error}
        </Alert>
        <Button onClick={() => navigate('/')} className="gradient-button">
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <div className="min-vh-100 position-relative overflow-hidden feedback-page">
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={10} xl={8} className="mx-auto">
            {/* Header */}
            <div className="mb-4">
              <Link to="/" className="text-decoration-none">
                <Button variant="link" className="p-0 mb-3 text-decoration-none">
                  <ArrowLeft size={20} className="me-2" />
                  Back to Home
                </Button>
              </Link>
              
              <div className="text-center mb-5">
                <div className="feedback-badge mb-3">
                  <Award size={16} className="me-1" />
                  Interview Complete
                </div>
                <h1 className="display-5 fw-bold mb-3">
                  Your Interview
                  <span className="gradient-text"> Performance Report</span>
                </h1>
                <p className="text-muted lead">
                  {interview?.position} 
                  {interview?.company && ` at ${interview.company}`}
                </p>
              </div>
            </div>

            {/* Overall Score Card */}
            <Card className="mb-4 overall-score-card glassmorphism">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <h3 className="fw-bold mb-3">Overall Performance</h3>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div 
                        className="score-circle"
                        style={{ background: getScoreGradient(feedback?.overallRating) }}
                      >
                        <h2 className="mb-0 text-white fw-bold">{feedback?.overallRating}</h2>
                        <small className="text-white">/10</small>
                      </div>
                      <div>
                        <h4 className="mb-1">{getScoreLabel(feedback?.overallRating)}</h4>
                        <p className="text-muted mb-0">
                          You're in the top {100 - (feedback?.overallRating * 10)}% of candidates
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <div className="stats-grid">
                        <div className="stat-item">
                          <Clock size={20} className="text-primary mb-1" />
                          <h5 className="mb-0">{interview?.duration || 0}m</h5>
                          <small className="text-muted">Duration</small>
                        </div>
                        <div className="stat-item">
                          <MessageCircle size={20} className="text-primary mb-1" />
                          <h5 className="mb-0">{interview?.questionsAsked || 0}</h5>
                          <small className="text-muted">Questions</small>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Detailed Scores */}
            <Card className="mb-4 detailed-scores-card glassmorphism">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Skill Assessment</h4>
                <Row className="g-4">
                  {[
                    { name: 'Technical Skills', score: feedback?.technicalScore, icon: <Target size={20} /> },
                    { name: 'Communication', score: feedback?.communicationScore, icon: <MessageSquare size={20} /> },
                    { name: 'Problem Solving', score: feedback?.problemSolving, icon: <Puzzle size={20} /> },
                    { name: 'Culture Fit', score: feedback?.cultureFit, icon: <Users size={20} /> }
                  ].map((skill, index) => (
                    <Col md={6} key={index}>
                      <div className="skill-item">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <div className="skill-icon">
                              {skill.icon}
                            </div>
                            <span className="fw-medium">{skill.name}</span>
                          </div>
                          <div className="text-end">
                            <div className="score-badge" style={{ background: getScoreGradient(skill.score) }}>
                              {skill.score}/10
                            </div>
                            <small className="text-muted d-block mt-1">
                              {getScoreLabel(skill.score)}
                            </small>
                          </div>
                        </div>
                        <div className="progress-wrapper">
                          <div 
                            className="progress-bar-custom"
                            style={{ 
                              width: `${skill.score * 10}%`,
                              background: getScoreGradient(skill.score)
                            }}
                          />
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Strengths and Improvements */}
            <Row className="mb-4">
              <Col lg={6} className="mb-4 mb-lg-0">
                <Card className="h-100 strengths-card glassmorphism">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="section-icon success">
                        <CheckCircle size={24} />
                      </div>
                      <h4 className="fw-bold mb-0">Your Strengths</h4>
                    </div>
                    <ul className="strengths-list">
                      {feedback?.strengths?.map((strength, index) => (
                        <li key={index} className="strength-item">
                          <Star size={16} className="text-success me-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="h-100 improvements-card glassmorphism">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="section-icon warning">
                        <TrendingUp size={24} />
                      </div>
                      <h4 className="fw-bold mb-0">Areas for Growth</h4>
                    </div>
                    <ul className="improvements-list">
                      {feedback?.improvements?.map((improvement, index) => (
                        <li key={index} className="improvement-item">
                          <AlertTriangle size={16} className="text-warning me-2" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Detailed Feedback */}
            <Card className="mb-4 feedback-card glassmorphism">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="section-icon primary">
                    <MessageSquare size={24} />
                  </div>
                  <h4 className="fw-bold mb-0">Detailed Analysis</h4>
                </div>
                <p className="text-muted feedback-text">
                  {feedback?.detailedFeedback}
                </p>
              </Card.Body>
            </Card>

            {/* Next Steps */}
            <Card className="mb-4 next-steps-card glassmorphism">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="section-icon gradient">
                    <ChevronRight size={24} />
                  </div>
                  <h4 className="fw-bold mb-0">Your Next Steps</h4>
                </div>
                <div className="steps-grid">
                  {feedback?.nextSteps?.map((step, index) => (
                    <div key={index} className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <p className="mb-0">{step}</p>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Resources */}
            {feedback?.recommendations && feedback.recommendations.length > 0 && (
              <Card className="mb-4 resources-card glassmorphism">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="section-icon info">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="fw-bold mb-0">Recommended Resources</h4>
                  </div>
                  <div className="resources-grid">
                    {feedback.recommendations.map((resource, index) => (
                      <a 
                        key={index}
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-item"
                      >
                        <BookOpen size={16} />
                        <span>{resource.title}</span>
                        <ChevronRight size={16} className="ms-auto" />
                      </a>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="text-center mt-5">
              <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                <Button className="action-button gradient-button">
                  <Download size={20} className="me-2" />
                  Download Report
                </Button>
                <Button className="action-button secondary-button">
                  <Share2 size={20} className="me-2" />
                  Share Results
                </Button>
              </div>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/">
                  <Button size="lg" variant="outline-primary" className="px-4">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="lg" className="gradient-button px-4">
                    Start New Interview
                    <ChevronRight size={20} className="ms-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FeedbackPage;