import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  ChevronRight,
  Zap,
  Shield,
  Target
} from 'lucide-react';

function HomePage() {
  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Hero Section */}
      <Container className="pt-5">
        <Row className="justify-content-center text-center mb-5 hero-section">
          <Col lg={10}>
            <div className="hero-badge mb-4">
              <span className="badge-content">
                <Sparkles size={16} className="me-1" />
                AI-Powered Interview Prep
              </span>
            </div>
            
            <h1 className="display-3 fw-bold mb-4 hero-title">
              Master Your Next Interview with
              <span className="gradient-text"> AI Intelligence</span>
            </h1>
            
            <p className="lead mb-5 text-muted hero-description">
              Experience personalized mock interviews powered by advanced AI. 
              Get real-time feedback, improve your responses, and land your dream job 
              with confidence.
            </p>
            
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/upload">
                <Button 
                  size="lg" 
                  className="px-5 py-3 main-cta-button"
                >
                  Start Free Interview
                  <ChevronRight size={20} className="ms-2" />
                </Button>
              </Link>
            </div>

          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mt-5 pt-5">
          <Col xs={12} className="text-center mb-5">
            <div className="section-badge mb-3">
              <Zap size={16} className="me-1" />
              Features
            </div>
            <h2 className="display-5 fw-bold">Why Choose Our AI Interview Assistant?</h2>
          </Col>
        </Row>

        <Row className="g-4 pb-5">
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <Brain size={28} />
                </div>
                <h4 className="fw-bold mb-3">Smart AI Interviewer</h4>
                <p className="text-muted mb-3">
                  Our GPT-powered AI adapts questions based on your resume and responses, 
                  providing a personalized interview experience.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">GPT-4 Powered</span>
                  <span className="feature-tag">Contextual</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <MessageSquare size={28} />
                </div>
                <h4 className="fw-bold mb-3">Real-time Feedback</h4>
                <p className="text-muted mb-3">
                  Get instant, detailed feedback on your answers with actionable 
                  suggestions to improve your interview performance.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Instant Analysis</span>
                  <span className="feature-tag">Detailed</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <TrendingUp size={28} />
                </div>
                <h4 className="fw-bold mb-3">Track Progress</h4>
                <p className="text-muted mb-3">
                  Review past interviews, monitor your improvement over time, 
                  and identify areas for continuous growth.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Analytics</span>
                  <span className="feature-tag">Progress Tracking</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <Target size={28} />
                </div>
                <h4 className="fw-bold mb-3">Industry Specific</h4>
                <p className="text-muted mb-3">
                  Tailored questions for various industries and roles, ensuring 
                  relevant and targeted interview preparation.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Customized</span>
                  <span className="feature-tag">Role-based</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <Shield size={28} />
                </div>
                <h4 className="fw-bold mb-3">Secure & Private</h4>
                <p className="text-muted mb-3">
                  Your data is encrypted and secure. Practice interviews with 
                  complete privacy and confidentiality.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Encrypted</span>
                  <span className="feature-tag">Private</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body className="p-4">
                <div className="feature-icon mb-3">
                  <Sparkles size={28} />
                </div>
                <h4 className="fw-bold mb-3">AI-Powered Insights</h4>
                <p className="text-muted mb-3">
                  Receive intelligent insights and recommendations based on 
                  industry best practices and successful patterns.
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Smart Analysis</span>
                  <span className="feature-tag">Insights</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row className="py-5 mt-5">
          <Col xs={12} className="text-center">
            <div className="cta-section glassmorphism p-5">
              <h2 className="display-6 fw-bold mb-3">Ready to Ace Your Next Interview?</h2>
              <p className="lead text-muted mb-4">
                Join thousands of successful candidates who landed their dream jobs
              </p>
              <Link to="/upload">
                <Button size="lg" className="px-5 py-3 main-cta-button">
                  Start Your Free Interview Now
                  <ChevronRight size={20} className="ms-2" />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;