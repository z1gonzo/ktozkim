import express from 'express';

const router = express.Router();

// Mock data - replace with actual DB queries
const mockOfficials = [
  {
    id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    position: 'City Councilor',
    city: 'Warsaw',
    companyId: null,
    bio: 'Elected representative serving the community.',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    firstName: 'Anna',
    lastName: 'Nowak',
    position: 'CEO',
    city: 'Warsaw',
    companyId: 2,
    bio: 'Executive director of public transportation services.',
    verified: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Get all officials with optional filtering
router.get('/', (req: express.Request, res: express.Response) => {
  try {
    const { city, position, verified, limit = 20, offset = 0 } = req.query;

    let filteredOfficials = [...mockOfficials];

    // Apply filters
    if (city) {
      filteredOfficials = filteredOfficials.filter(official =>
        official.city?.toLowerCase().includes((city as string).toLowerCase())
      );
    }

    if (position) {
      filteredOfficials = filteredOfficials.filter(official =>
        official.position?.toLowerCase().includes((position as string).toLowerCase())
      );
    }

    if (verified !== undefined) {
      const isVerified = verified === 'true';
      filteredOfficials = filteredOfficials.filter(official =>
        official.verified === isVerified
      );
    }

    // Apply pagination
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedOfficials = filteredOfficials.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        officials: paginatedOfficials,
        total: filteredOfficials.length,
        limit: parseInt(limit as string),
        offset: startIndex,
      }
    });
  } catch (error) {
    console.error('Get officials error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get official by ID
router.get('/:id', (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const official = mockOfficials.find(o => o.id === parseInt(id));

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found'
      });
    }

    res.json({
      success: true,
      data: { official }
    });
  } catch (error) {
    console.error('Get official error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new official (admin only - requires auth middleware)
router.post('/', (req: express.Request, res: express.Response) => {
  // TODO: Add authentication middleware
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented - requires authentication'
  });
});

// Update official (admin only - requires auth middleware)
router.put('/:id', (req: express.Request, res: express.Response) => {
  // TODO: Add authentication middleware
  res.status(501).json({
    success: false,
    message: 'Endpoint not implemented - requires authentication'
  });
});

export default router;
