import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function InterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetchInterview();
    fetchMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInterview = async () => {
    try {
      const response = await axios.get(`${API_URL}/interviews/${id}`);
      setInterview(response.data.interview);
    } catch (error) {
      console.error('Error fetching interview:', error);
      setError('Failed to load interview details');
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/messages/${id}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setInput('');
    setSending(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/messages/${id}`, {
        message: userMessage,
      });

      // Add both user and AI messages to the state
      setMessages(prev => [
        ...prev,
        response.data.userMessage,
        response.data.aiMessage
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setInput(userMessage); // Restore the input
    } finally {
      setSending(false);
    }
  };

  const endInterview = async () => {
    if (!window.confirm('Are you sure you want to end this interview?')) return;

    try {
      await axios.post(`${API_URL}/interviews/${id}/end`);
      navigate(`/feedback/${id}`);
    } catch (error) {
      console.error('Error ending interview:', error);
      setError('Failed to end interview. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading interview...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={10} className="mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3>AI Interview Session</h3>
              {interview && (
                <p className="text-muted mb-0">
                  Position: {interview.position} 
                  {interview.company && ` at ${interview.company}`}
                </p>
              )}
            </div>
            <Button variant="danger" onClick={endInterview}>
              End Interview
            </Button>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Chat Container */}
          <Card className="shadow-sm" style={{ height: '65vh' }}>
            <Card.Body className="d-flex flex-column p-0">
              {/* Messages Area */}
              <div className="flex-grow-1 overflow-auto p-4" style={{ backgroundColor: '#f8f9fa' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 d-flex ${
                      message.role === 'USER' ? 'justify-content-end' : 'justify-content-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-3 ${
                        message.role === 'USER'
                          ? 'bg-primary text-white ms-5'
                          : 'bg-white me-5 border'
                      }`}
                      style={{ 
                        maxWidth: '70%',
                        boxShadow: message.role === 'AI' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      <div className="small text-muted mb-1">
                        {message.role === 'USER' ? 'You' : 'AI Interviewer'}
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {sending && (
                  <div className="d-flex justify-content-start mb-3">
                    <div className="bg-white p-3 rounded-3 border" style={{ maxWidth: '70%' }}>
                      <div className="d-flex align-items-center">
                        <Spinner animation="border" size="sm" className="me-2" />
                        <span className="text-muted">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-top p-3">
                <Form onSubmit={sendMessage}>
                  <Row className="g-2">
                    <Col>
                      <Form.Control
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer here..."
                        disabled={sending}
                        className="py-2"
                      />
                    </Col>
                    <Col xs="auto">
                      <Button 
                        type="submit" 
                        disabled={sending || !input.trim()}
                        className="px-4 py-2"
                      >
                        {sending ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          'Send'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <small className="text-muted mt-2 d-block">
                  Press Enter to send your message
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default InterviewPage;