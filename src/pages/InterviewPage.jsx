import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { 
  Send, 
  StopCircle, 
  Bot, 
  User, 
  Clock, 
  Briefcase,
  Building2,
  AlertCircle,
  ArrowLeft,
  Mic,
  MicOff
} from 'lucide-react';
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
  const [startTime] = useState(new Date());
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchInterview();
    fetchMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(Math.floor((new Date() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

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

      setMessages(prev => [
        ...prev,
        response.data.userMessage,
        response.data.aiMessage
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setInput(userMessage);
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3" style={{ color: '#667eea' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-muted">Preparing your interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 position-relative overflow-hidden chat-page">
      {/* Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="gradient-bg-subtle"></div>
      </div>

      <Container fluid className="h-100 py-3">
        <Row className="h-100">
          <Col lg={10} xl={8} className="mx-auto h-100 d-flex flex-column">
            {/* Header */}
            <div className="chat-header glassmorphism-subtle p-3 mb-3 rounded-3">
              <Row className="align-items-center">
                <Col>
                  <Link to="/" className="text-decoration-none">
                    <Button variant="link" className="p-0 text-decoration-none">
                      <ArrowLeft size={20} className="me-2" />
                    </Button>
                  </Link>
                </Col>
                <Col className="text-center">
                  <h5 className="mb-0 fw-bold">AI Interview Session</h5>
                  {interview && (
                    <div className="d-flex align-items-center justify-content-center gap-3 mt-1">
                      <small className="text-muted d-flex align-items-center">
                        <Briefcase size={14} className="me-1" />
                        {interview.position}
                      </small>
                      {interview.company && (
                        <small className="text-muted d-flex align-items-center">
                          <Building2 size={14} className="me-1" />
                          {interview.company}
                        </small>
                      )}
                    </div>
                  )}
                </Col>
                <Col className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-3">
                    <div className="duration-badge">
                      <Clock size={16} className="me-1" />
                      {formatDuration(duration)}
                    </div>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={endInterview}
                      className="end-button"
                    >
                      <StopCircle size={16} className="me-1" />
                      End
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>

            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError('')}
                className="glass-alert mb-3"
              >
                <AlertCircle size={18} className="me-2" />
                {error}
              </Alert>
            )}

            {/* Chat Container */}
            <Card className="flex-grow-1 chat-container glassmorphism-subtle">
              <Card.Body className="d-flex flex-column p-0">
                {/* Messages Area */}
                <div className="flex-grow-1 messages-area">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`message-wrapper ${message.role === 'USER' ? 'user' : 'ai'} 
                        ${index === 0 ? 'first' : ''}`}
                    >
                      <div className="message-content">
                        <div className="avatar-wrapper">
                          <div className="avatar">
                            {message.role === 'USER' ? <User size={20} /> : <Bot size={20} />}
                          </div>
                        </div>
                        <div className="message-bubble">
                          <div className="message-header">
                            {message.role === 'USER' ? 'You' : 'AI Interviewer'}
                          </div>
                          <div className="message-text">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {sending && (
                    <div className="message-wrapper ai">
                      <div className="message-content">
                        <div className="avatar-wrapper">
                          <div className="avatar">
                            <Bot size={20} />
                          </div>
                        </div>
                        <div className="message-bubble">
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="input-area">
                  <Form onSubmit={sendMessage}>
                    <div className="input-wrapper">
                      <Button 
                        variant="link" 
                        className="mic-button"
                        disabled
                        title="Voice input coming soon"
                      >
                        <MicOff size={20} />
                      </Button>
                      <Form.Control
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer here..."
                        disabled={sending}
                        className="message-input"
                      />
                      <Button 
                        type="submit" 
                        disabled={sending || !input.trim()}
                        className="send-button"
                      >
                        {sending ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <Send size={20} />
                        )}
                      </Button>
                    </div>
                  </Form>
                  <small className="text-muted text-center d-block mt-2">
                    Press Enter to send your message
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InterviewPage;