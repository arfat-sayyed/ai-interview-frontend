import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="display-4 mb-4">AI Interview Assistant</h1>
          <p className="lead">
            Practice interviews with an AI that adapts to your resume and provides 
            comprehensive feedback to help you succeed.
          </p>
          <Link to="/upload">
            <Button variant="primary" size="lg" className="mt-3">
              Start Interview
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h4>Smart AI Interviewer</h4>
              <p>Powered by GPT-4, our AI adapts questions based on your resume and responses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h4>Real-time Feedback</h4>
              <p>Get instant feedback on your answers with detailed analysis and suggestions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h4>Track Progress</h4>
              <p>Review past interviews and track your improvement over time</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;