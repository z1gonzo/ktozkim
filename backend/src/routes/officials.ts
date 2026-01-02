import express from 'express';
import { OfficialModel } from '../models/Official';
import { param, query, validationResult } from 'express-validator';

const router = express.Router();

// Get all officials with optional filtering
router.get('/', [
  query('city').optional().isString(),
  query('position').optional().isString(),
  query('verified').optional().isBoolean(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 }),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array()
      });
    }

    const { city, position, verified, limit = 20, offset = 0 } = req.query;

    const filters = {
      city: city as string,
      position: position as string,
      verified: verified === 'true' ? true : verified === 'false' ? false : undefined,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
    };

    const result = await OfficialModel.findAll(filters);

    res.json({
      success: true,
      data: {
        officials: result.officials.map(official => ({
          id: official.id,
          firstName: official.first_name,
          lastName: official.last_name,
          position: official.position,
          city: official.city,
          companyId: official.company_id,
          bio: official.bio,
          verified: official.verified,
          createdAt: official.created_at,
          updatedAt: official.updated_at,
        })),
        total: result.total,
        limit: filters.limit,
        offset: filters.offset,
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
router.get('/:id', [
  param('id').isInt({ min: 1 }),
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID parameter',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const official = await OfficialModel.findById(parseInt(id));

    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found'
      });
    }

    res.json({
      success: true,
      data: {
        official: {
          id: official.id,
          firstName: official.first_name,
          lastName: official.last_name,
          position: official.position,
          city: official.city,
          companyId: official.company_id,
          bio: official.bio,
          verified: official.verified,
          createdAt: official.created_at,
          updatedAt: official.updated_at,
        }
      }
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
