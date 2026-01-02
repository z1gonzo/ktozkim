const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface Report {
  id?: number;
  allegationType: string;
  title: string;
  description: string;
  status?: string;
  createdAt?: string;
  officialId: number;
  evidence?: string;
}

export const getReports = async (): Promise<Report[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const createReport = async (reportData: Omit<Report, 'id' | 'status' | 'createdAt'>): Promise<Report> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

export const getOfficials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/officials`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching officials:', error);
    throw error;
  }
};
