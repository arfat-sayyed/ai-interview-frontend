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

      <style jsx>{`
        /* Gradient Background */
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0.1;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        /* Floating Shapes Animation */
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0.05;
          border-radius: 50%;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 50%;
          right: -100px;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          bottom: -125px;
          left: 30%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(30px) rotate(240deg);
          }
        }

        /* Hero Section */
        .hero-section {
          padding-top: 3rem;
        }

        .hero-badge {
          display: inline-block;
        }

        .badge-content {
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.875rem;
          color: #667eea;
          display: flex;
          align-items: center;
        }

        .hero-title {
          font-weight: 800;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.25rem;
        }

        /* Buttons */
        .main-cta-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .main-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .secondary-button {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Stats */
        .stat-item {
          padding: 1rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.875rem;
        }

        /* Section Badge */
        .section-badge {
          display: inline-block;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 0.25rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Feature Cards - Glassmorphism */
        .feature-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
        }

        .feature-card:hover::before {
          transform: translateX(0);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .feature-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .feature-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border-radius: 50px;
          font-weight: 500;
        }

        /* CTA Section */
        .cta-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .shape {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;