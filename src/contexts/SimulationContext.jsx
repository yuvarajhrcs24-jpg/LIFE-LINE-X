import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SimulationContext = createContext(null);

const now = new Date();
const ago = (mins) => new Date(now - mins * 60000).toISOString();

const MOCK_REQUESTS = [
  { id: uuidv4(), type: 'flood', priority: 'high', status: 'pending', description: 'Water rising rapidly, trapped on rooftop with family of 4', lat: 28.6139, lng: 77.2090, author: 'Rahul Sharma', authorId: 'user1', timestamp: ago(5), upvotes: 12, downvotes: 0, reports: 0, authorTrustScore: 75 },
  { id: uuidv4(), type: 'medical', priority: 'high', status: 'accepted', description: 'Elderly person having chest pain, need ambulance urgently', lat: 28.6200, lng: 77.2150, author: 'Priya Singh', authorId: 'user2', timestamp: ago(10), upvotes: 8, downvotes: 0, reports: 0, authorTrustScore: 82 },
  { id: uuidv4(), type: 'fire', priority: 'high', status: 'in-progress', description: 'Building on fire, multiple families trapped on 3rd floor', lat: 28.6080, lng: 77.2030, author: 'Amit Kumar', authorId: 'user3', timestamp: ago(15), upvotes: 25, downvotes: 1, reports: 0, authorTrustScore: 90 },
  { id: uuidv4(), type: 'earthquake', priority: 'medium', status: 'pending', description: 'Building partially collapsed, debris blocking road', lat: 28.6250, lng: 77.1980, author: 'Sita Devi', authorId: 'user4', timestamp: ago(30), upvotes: 6, downvotes: 2, reports: 0, authorTrustScore: 65 },
  { id: uuidv4(), type: 'food', priority: 'medium', status: 'pending', description: 'Relief camp running out of food, 200+ people affected', lat: 28.6170, lng: 77.2200, author: 'NGO Helper', authorId: 'user5', timestamp: ago(45), upvotes: 15, downvotes: 0, reports: 0, authorTrustScore: 88 },
  { id: uuidv4(), type: 'shelter', priority: 'medium', status: 'accepted', description: 'Family of 6 needs shelter, lost everything in flood', lat: 28.6300, lng: 77.2100, author: 'Ramesh Yadav', authorId: 'user6', timestamp: ago(60), upvotes: 9, downvotes: 0, reports: 0, authorTrustScore: 70 },
  { id: uuidv4(), type: 'infrastructure', priority: 'low', status: 'resolved', description: 'Power line down blocking main road, fixed by authorities', lat: 28.6050, lng: 77.2250, author: 'Local Report', authorId: 'user7', timestamp: ago(120), upvotes: 4, downvotes: 1, reports: 0, authorTrustScore: 55 },
  { id: uuidv4(), type: 'medical', priority: 'low', status: 'resolved', description: 'Minor injuries from debris, treated at local clinic', lat: 28.6100, lng: 77.2000, author: 'Dr. Meena', authorId: 'user8', timestamp: ago(180), upvotes: 3, downvotes: 0, reports: 0, authorTrustScore: 95 },
  { id: uuidv4(), type: 'violence', priority: 'high', status: 'pending', description: 'Looting reported at relief distribution center, need police', lat: 28.6220, lng: 77.2070, author: 'Anon', authorId: 'user9', timestamp: ago(8), upvotes: 2, downvotes: 5, reports: 2, authorTrustScore: 30 },
  { id: uuidv4(), type: 'flood', priority: 'medium', status: 'in-progress', description: 'Basement flooded, pump needed urgently', lat: 28.6190, lng: 77.2130, author: 'Suresh Kumar', authorId: 'user10', timestamp: ago(25), upvotes: 7, downvotes: 0, reports: 0, authorTrustScore: 72 },
];

const MOCK_RESOURCES = [
  { id: uuidv4(), name: 'Red Cross Relief Camp', type: 'shelter', status: 'available', lat: 28.6139, lng: 77.2090, capacity: 200, current: 120, address: 'Community Ground, Sector 4', phone: '011-23456789', upvotes: 45 },
  { id: uuidv4(), name: 'Government Hospital Annex', type: 'medical', status: 'limited', lat: 28.6200, lng: 77.2150, capacity: 50, current: 42, address: 'Civil Hospital Road', phone: '108', upvotes: 38 },
  { id: uuidv4(), name: 'Food Distribution Center', type: 'food', status: 'available', lat: 28.6080, lng: 77.2030, capacity: 500, current: 200, address: 'Main Market, Block B', phone: '1800-111-555', upvotes: 62 },
  { id: uuidv4(), name: 'Water Supply Point', type: 'water', status: 'available', lat: 28.6250, lng: 77.1980, capacity: 1000, current: 300, address: 'Pump Station No. 3', phone: '1916', upvotes: 29 },
  { id: uuidv4(), name: 'NDRF Rescue Base', type: 'rescue', status: 'available', lat: 28.6170, lng: 77.2200, capacity: 20, current: 5, address: 'Police Ground, Sector 7', phone: '011-24363260', upvotes: 55 },
  { id: uuidv4(), name: 'Emergency Medical Camp', type: 'medical', status: 'unavailable', lat: 28.6300, lng: 77.2100, capacity: 30, current: 30, address: 'School Grounds, Block A', phone: '102', upvotes: 15 },
];

const MOCK_VOLUNTEERS = [
  { id: uuidv4(), name: 'Vikram Mehta', role: 'volunteer', skills: ['medical', 'first_aid', 'rescue'], available: true, lat: 28.6145, lng: 77.2095, phone: '+91-9876543210', experience: '3 years', trustScore: 88, currentTask: null },
  { id: uuidv4(), name: 'Kavita Reddy', role: 'volunteer', skills: ['food', 'logistics', 'coordination'], available: true, lat: 28.6205, lng: 77.2155, phone: '+91-9876543211', experience: '2 years', trustScore: 82, currentTask: 'Food distribution' },
  { id: uuidv4(), name: 'Arun Patel', role: 'volunteer', skills: ['rescue', 'swimming', 'boat'], available: false, lat: 28.6085, lng: 77.2035, phone: '+91-9876543212', experience: '5 years', trustScore: 95, currentTask: 'Active rescue operation' },
  { id: uuidv4(), name: 'Sunita Joshi', role: 'volunteer', skills: ['medical', 'counseling', 'shelter'], available: true, lat: 28.6255, lng: 77.1985, phone: '+91-9876543213', experience: '1 year', trustScore: 75, currentTask: null },
  { id: uuidv4(), name: 'Ravi Gupta', role: 'volunteer', skills: ['infrastructure', 'electrical', 'plumbing'], available: true, lat: 28.6175, lng: 77.2205, phone: '+91-9876543214', experience: '4 years', trustScore: 85, currentTask: null },
];

const MOCK_SAFE_ZONES = [
  { id: uuidv4(), name: 'Central Community Hall', lat: 28.6139, lng: 77.2090, type: 'shelter', capacity: 500, distance: 0.3 },
  { id: uuidv4(), name: 'District Hospital', lat: 28.6200, lng: 77.2150, type: 'medical', capacity: 100, distance: 0.8 },
  { id: uuidv4(), name: 'Government School Campus', lat: 28.6250, lng: 77.1980, type: 'shelter', capacity: 300, distance: 1.2 },
];

const MOCK_DANGER_ZONES = [
  { id: uuidv4(), name: 'Flood Zone Alpha', lat: 28.6139, lng: 77.2090, radiusKm: 0.5, level: 'critical', type: 'flood' },
  { id: uuidv4(), name: 'Fire Zone', lat: 28.6080, lng: 77.2030, radiusKm: 0.3, level: 'high', type: 'fire' },
];

const MOCK_CHANNELS = [
  { id: 'general', name: 'General', icon: '📢' },
  { id: 'rescue', name: 'Rescue Ops', icon: '🚁' },
  { id: 'medical', name: 'Medical', icon: '🏥' },
  { id: 'volunteers', name: 'Volunteers', icon: '🙋' },
  { id: 'authorities', name: 'Authorities', icon: '🏛️' },
];

const MOCK_MESSAGES = {
  general: [
    { id: uuidv4(), author: 'NDRF Team', text: 'Rescue operations ongoing in Sector 4. Please stay clear of flooded areas.', timestamp: ago(20), authorId: 'ndrf' },
    { id: uuidv4(), author: 'District Collector', text: 'Relief camps set up at 3 locations. Check the map for nearest one.', timestamp: ago(15), authorId: 'dc' },
    { id: uuidv4(), author: 'Volunteer Vikram', text: 'Food supplies running low at Camp B. Need donations urgently!', timestamp: ago(10), authorId: 'user1' },
  ],
};

const MOCK_INCIDENTS = [
  { id: uuidv4(), type: 'flood', timestamp: ago(180), title: 'Heavy flooding in Sector 4', status: 'in-progress', affectedPeople: 450 },
  { id: uuidv4(), type: 'fire', timestamp: ago(120), title: 'Building fire at Market Complex', status: 'resolved', affectedPeople: 30 },
  { id: uuidv4(), type: 'earthquake', timestamp: ago(300), title: 'Minor earthquake tremor', status: 'resolved', affectedPeople: 0 },
];

export function SimulationProvider({ children }) {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [volunteers, setVolunteers] = useState(MOCK_VOLUNTEERS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [channels] = useState(MOCK_CHANNELS);
  const [safeZones] = useState(MOCK_SAFE_ZONES);
  const [dangerZones] = useState(MOCK_DANGER_ZONES);
  const [incidents] = useState(MOCK_INCIDENTS);

  const addRequest = (req) => setRequests(prev => [{ id: uuidv4(), timestamp: new Date().toISOString(), upvotes: 0, downvotes: 0, reports: 0, authorTrustScore: 50, ...req }, ...prev]);
  const updateRequest = (id, updates) => setRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r));
  const addResource = (res) => setResources(prev => [...prev, { id: uuidv4(), upvotes: 0, ...res }]);
  const updateResource = (id, updates) => setResources(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  const sendMessage = (channelId, msg) => setMessages(prev => ({ ...prev, [channelId]: [...(prev[channelId] || []), { id: uuidv4(), timestamp: new Date().toISOString(), ...msg }] }));
  const upvoteRequest = (id) => updateRequest(id, {});
  const assignVolunteer = (volunteerId, taskDesc) => setVolunteers(prev => prev.map(v => v.id === volunteerId ? { ...v, currentTask: taskDesc, available: false } : v));

  return (
    <SimulationContext.Provider value={{ requests, resources, volunteers, messages, channels, safeZones, dangerZones, incidents, addRequest, updateRequest, addResource, updateResource, sendMessage, upvoteRequest, assignVolunteer }}>
      {children}
    </SimulationContext.Provider>
  );
}

export const useSimulation = () => useContext(SimulationContext);
