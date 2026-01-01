import express from 'express';

const router = express.Router();

// Mock data - replace with actual DB queries
const mockReports = [
  {
    id: 1,
    userId: 1,
    officialId: 1,
    allegationType: 'conflict_of_interest',
    title: 'Potential Conflict in City Contract',
    description: 'The councilor appears to have connections to the company awarded the recent city contract.',
    evidence: 'Link to news article, contract documents',
    status: 'pending',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// Get all reports (with optional filtering)
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    const { status, allegationType, limit = 20, offset = 0 } = req.query;

    let filteredReports = [...mockReports];

    // Apply filters
    if (status) {
      filteredReports = filteredReports.filter(report =>
        report.status === status
      );
    }

    if (allegationType) {
      filteredReports = filteredReports.filter(report =>
        report.allegationType === allegationType
      );
    }

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedReports = filteredReports.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        reports: paginatedReports,
        total: filteredReports.length,
        limit: parseInt(limit as string),
        offset: startIndex,
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get report by ID
router.get('/:id', (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const report = mockReports.find(r => r.id === parseInt(id));

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new report (requires authentication)
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    const {
      officialId,
      allegationType,
      title,
      description,
      evidence
    } = req.body;

    // Basic validation
    if (!officialId || !allegationType || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // TODO: Get userId from authenticated user
    const userId = 1; // Mock user ID

    const newReport = {
      id: mockReports.length + 1,
      userId,
      officialId: parseInt(officialId),
      allegationType,
      title,
      description,
      evidence: evidence || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockReports.push(newReport);

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: { report: newReport }
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update report status (admin only - requires auth middleware)
router.put('/:id/status', (req: express.Request, res: express.Response) => {
  // TODO: Add authentication middleware
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented - requires authentication'
  });
});

export default router;
