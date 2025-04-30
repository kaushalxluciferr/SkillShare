import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Send, MessageCircle, ArrowLeft, Search } from 'lucide-react';
import { AppContext } from '../context/Appcontext';

function Message() {
  const navigate = useNavigate();
  const { user,backendurl1 } = useContext(AppContext);
  const { id } = useParams();
  
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef(null);
  const usertoken = localStorage.getItem('usertoken');
  const currentUserId = user?._id;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll for new messages every 3 seconds when conversation is selected
  useEffect(() => {
    if (!selectedUser?._id) return;

    const pollInterval = setInterval(() => {
      fetchMessages(selectedUser._id);
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [selectedUser?._id]);

  // Filter conversations based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(convo => 
        convo.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredConversations(filtered);
    }
  }, [searchTerm, conversations]);

  const fetchUserDetails = async (userId) => {
    try {
      const { data } = await axios.get(backendurl1+
        `/user/${userId}`,
        { headers: { token: usertoken } }
      );
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch user');
      return null;
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendurl1,
        { headers: { token: usertoken } }
      );
  
      if (data.success) {
        const sortedConvos = (data.data || []).sort((a, b) => 
          new Date(b.lastMessage?.createdAt || 0) - new Date(a.lastMessage?.createdAt || 0)
        );
        setConversations(sortedConvos);
        setFilteredConversations(sortedConvos);
        
        if (id) {
          const existingConvo = sortedConvos.find(c => c.user?._id === id);
          if (existingConvo) {
            setSelectedUser(existingConvo.user);
            await fetchMessages(id);
          } else {
            const userData = await fetchUserDetails(id);
            if (userData) {
              setSelectedUser(userData);
              setMessages([]);
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const { data } = await axios.get(backendurl1+`/conversation/${userId}`,
        { headers: { token: usertoken } }
      );
      
      if (data.success) {
        const sortedMessages = (data.data || []).sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        
        const formattedMessages = sortedMessages.map(msg => ({
          ...msg,
          sender: msg.sender || { 
            _id: msg.senderId, 
            name: 'Unknown', 
            image: ''
          },
          receiver: msg.receiver || { 
            _id: msg.receiverId, 
            name: 'Unknown', 
            image: ''
          }
        }));
        
        setMessages(formattedMessages);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load messages');
    }
  };

  const sendMessage = async () => {
    if (!messageContent.trim() || !selectedUser || sending) return;

    const tempId = Date.now();
    const newMessage = {
      _id: tempId,
      content: messageContent,
      sender: { _id: currentUserId, name: user.name, image: user.image },
      receiver: selectedUser,
      createdAt: new Date(),
      isOptimistic: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageContent('');
    setSending(true);

    try {
      const { data } = await axios.post(backendurl1+'/send',
        { receiver: selectedUser._id, content: messageContent },
        { headers: { token: usertoken } }
      );

      if (data.success) {
        const serverMessage = {
          ...data.data,
          sender: { _id: currentUserId, name: user.name, image: user.image },
          receiver: selectedUser
        };
        
        setMessages(prev => [
          ...prev.filter(m => m._id !== tempId),
          serverMessage
        ]);

        await fetchConversations(); // Refresh conversation list
      }
    } catch (error) {
      setMessages(prev => prev.filter(m => m._id !== tempId));
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchConversations();
    }
  }, [id, user?._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Conversation list sidebar */}
      <div className={`w-full ${selectedUser ? 'hidden md:block' : 'block'} md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
        </div>
        
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'No matching conversations found' : 'No conversations yet'}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredConversations.map((convo) => (
              <div
                key={convo._id}
                onClick={() => {
                  setSelectedUser(convo.user);
                  navigate(`/message/${convo.user._id}`);
                }}
                className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 ${
                  selectedUser?._id === convo.user?._id ? 'bg-blue-50' : ''
                }`}
              >
                <img
                  src={convo.user?.image || 'https://via.placeholder.com/150'}
                  alt={convo.user?.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {convo.user?.name}
                    </h3>
                  
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {convo.lastMessage?.content || 'No messages yet'}
                  </p>
                  {convo.lastMessage?.createdAt && (
                    <p className="text-xs text-gray-400">
                      {new Date(convo.lastMessage.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message area */}
      <div className={`${selectedUser ? 'block' : 'hidden'} md:flex flex-col w-full md:w-2/3`}>
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center bg-white">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  navigate('/message');
                }}
                className="md:hidden mr-2 text-gray-600"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={selectedUser.image || 'https://via.placeholder.com/150'}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedUser.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageCircle size={48} className="mb-4 text-gray-400" />
                  <p>Start a conversation with {selectedUser.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.sender?._id === currentUserId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender?._id === currentUserId
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {msg.sender?._id !== currentUserId && (
                          <div className="flex items-center mb-1">
                            <img
                              src={msg.sender?.image}
                              alt={msg.sender?.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span className="text-xs font-semibold">{msg.sender?.name}</span>
                          </div>
                        )}
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 text-right ${
                          msg.sender?._id === currentUserId ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {msg.isOptimistic && ' (Sending...)'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* <div ref={messagesEndRef} /> */}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={sending}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending}
                  className={`px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    sending ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                {conversations.length ? 'Select a conversation' : 'No conversations yet'}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;