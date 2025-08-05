import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AIChat from '../../components/ui/AIChat';

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});

const mockOnClose = jest.fn();

describe('AIChat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<AIChat isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ask me about prasad's experience/i)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<AIChat isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<AIChat isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('sends message when form is submitted', async () => {
    const mockSendMessage = jest.fn().mockResolvedValue('AI response');
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('Test message');
    });
  });

  it('displays AI response in chat', async () => {
    const mockSendMessage = jest.fn().mockResolvedValue('AI response from service');
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('AI response from service')).toBeInTheDocument();
    });
  });

  it('shows fallback response when no onSendMessage prop is provided', async () => {
    render(<AIChat isOpen={true} onClose={mockOnClose} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/Please integrate an AI service/i)).toBeInTheDocument();
    });
  });

  it('handles error when AI service throws an error', async () => {
    const mockSendMessage = jest.fn().mockRejectedValue(new Error('Service error'));
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/having trouble responding/i)).toBeInTheDocument();
    });
  });

  it('handles Enter key press to send message', async () => {
    const mockSendMessage = jest.fn().mockResolvedValue('AI response');
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: false });

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('Test message');
    });
  });

  it('does not send message on Shift+Enter', async () => {
    const mockSendMessage = jest.fn().mockResolvedValue('AI response');
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: true });

    // Wait a bit to ensure no call was made
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('does not send empty message', async () => {
    const mockSendMessage = jest.fn().mockResolvedValue('AI response');
    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    // Try to send empty message
    fireEvent.click(sendButton);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('disables input and button while loading', async () => {
    let resolvePromise: (value: string) => void;
    const mockSendMessage = jest.fn(() => new Promise<string>(resolve => {
      resolvePromise = resolve;
    }));

    render(<AIChat isOpen={true} onClose={mockOnClose} onSendMessage={mockSendMessage} />);

    const textarea = screen.getByPlaceholderText(/ask me about prasad's experience/i);
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons.find(button => button.className.includes('send-button'))!;

    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    // Check that elements are disabled during loading
    expect(textarea).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // Resolve the promise
    resolvePromise!('AI response');

    // Wait for loading to complete
    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
    });
  });
});