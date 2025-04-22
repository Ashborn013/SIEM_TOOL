// Mock data for security events visualization
export const securityEventsMockData = [
    { name: 'Jan', malware: 45, intrusion: 32, auth: 65, policy: 28 },
    { name: 'Feb', malware: 52, intrusion: 38, auth: 59, policy: 35 },
    { name: 'Mar', malware: 48, intrusion: 42, auth: 73, policy: 31 },
    { name: 'Apr', malware: 61, intrusion: 35, auth: 54, policy: 42 },
    { name: 'May', malware: 55, intrusion: 45, auth: 68, policy: 38 },
    { name: 'Jun', malware: 67, intrusion: 41, auth: 71, policy: 33 },
  ];
  
  // Mock data for threat severity distribution
  export const threatSeverityData = [
    { name: 'Critical', value: 124, color: '#ff4d4f' },
    { name: 'High', value: 235, color: '#ff7a45' },
    { name: 'Medium', value: 387, color: '#ffa940' },
    { name: 'Low', value: 524, color: '#bae637' },
  ];
  
  // Mock data for geographic distribution of attacks
  export const geoDistributionData = [
    { name: 'North America', attacks: 456 },
    { name: 'Europe', attacks: 372 },
    { name: 'Asia', attacks: 289 },
    { name: 'South America', attacks: 167 },
    { name: 'Africa', attacks: 134 },
    { name: 'Oceania', attacks: 98 },
  ];
  
  // Mock data for hourly event distribution
  export const hourlyEventData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    events: Math.floor(Math.random() * 50) + 20, // Random number between 20 and 70
  }));
  
  // Mock data for top attack sources
  export const attackSourcesData = [
    { ip: '192.168.1.100', count: 1245, country: 'United States' },
    { ip: '10.0.0.55', count: 987, country: 'China' },
    { ip: '172.16.0.22', count: 876, country: 'Russia' },
    { ip: '169.254.0.1', count: 654, country: 'Brazil' },
    { ip: '192.168.0.5', count: 543, country: 'India' },
  ];
  
  // Function to generate random time-series data
  export const generateTimeSeriesData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      events: Math.floor(Math.random() * 100) + 50,
      alerts: Math.floor(Math.random() * 50) + 20,
      incidents: Math.floor(Math.random() * 20) + 5,
    }));
  };
  
  // Mock data for event types distribution
  export const eventTypesData = [
    { type: 'Authentication Failure', count: 456 },
    { type: 'Malware Detection', count: 324 },
    { type: 'Network Intrusion', count: 289 },
    { type: 'Policy Violation', count: 234 },
    { type: 'Data Exfiltration', count: 167 },
    { type: 'System Error', count: 145 },
  ];
  
  // Mock data for user activity
  export const userActivityData = [
    { timestamp: '2024-01-20T08:00:00', user: 'admin', action: 'login', status: 'success' },
    { timestamp: '2024-01-20T08:15:00', user: 'john.doe', action: 'file_access', status: 'denied' },
    { timestamp: '2024-01-20T08:30:00', user: 'jane.smith', action: 'config_change', status: 'success' },
    { timestamp: '2024-01-20T09:00:00', user: 'guest', action: 'login', status: 'failed' },
  ];
  
  // Helper function to generate random data for real-time updates
  export const generateRealtimeEvent = () => {
    const eventTypes = ['malware', 'intrusion', 'auth', 'policy'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    return {
      timestamp: new Date().toISOString(),
      type,
      severity: Math.floor(Math.random() * 4) + 1, // 1-4 severity level
      value: Math.floor(Math.random() * 50) + 1,
    };
  };
  