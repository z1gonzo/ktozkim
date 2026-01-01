# Ktoż Kim? (ktozkim.pl) - Civic Watchdog Platform

A platform for documenting and exploring connections, signs of hypocrisy, and suspicions of nepotism among public figures in cities and nationwide.

## Project Overview

This application serves as a civic watchdog tool where citizens can:
- View profiles of public officials, city councilors, and municipal company leaders
- Explore documented connections and relationships between officials
- Submit reports of potential conflicts of interest or nepotism
- Search and filter information by city, position, or company

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Minikube)

## Architecture

```
Frontend (React) ←→ Backend (Express) ←→ Database (PostgreSQL)
     ↓                      ↓                      ↓
  Docker Container    Docker Container    Docker Container
     ↓                      ↓                      ↓
              Kubernetes (Minikube)
```

## Data Model

### Core Entities
- **Users**: Citizens who can submit reports
- **Officials**: Public figures (councilors, directors, presidents)
- **Companies**: Municipal companies and politically-oriented businesses
- **Connections**: Relationships between officials and companies
- **Reports**: User-submitted allegations and evidence

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Minikube
- Node.js 18+ (for local development)
- kubectl

### Quick Start
```bash
# Clone repository
git clone <repo-url>
cd ktozkim-pl

# Start local development environment
docker-compose up -d

# Access frontend at http://localhost:3000
# Access backend API at http://localhost:5000
```

### Full Deployment (Minikube)
```bash
# Start Minikube
minikube start

# Deploy to Kubernetes
kubectl apply -f k8s/

# Get service URLs
minikube service frontend-service
minikube service backend-service
```

## Project Progress

### Phase 1: Project Setup ✅
- [x] Create project structure
- [x] Initialize README.md with progress tracking
- [x] Set up Git repository
- [x] Create initial Docker configurations

### Phase 2: Backend Development
- [ ] Set up Node.js + Express + TypeScript
- [ ] Configure PostgreSQL database
- [ ] Implement authentication system
- [ ] Create API endpoints for CRUD operations
- [ ] Add input validation and error handling
- [ ] Implement basic testing

### Phase 3: Frontend Development
- [ ] Initialize React + TypeScript project
- [ ] Create component library
- [ ] Implement routing and navigation
- [ ] Build official profile pages
- [ ] Create search and filter interface
- [ ] Implement report submission form

### Phase 4: Integration & Testing
- [ ] Connect frontend to backend APIs
- [ ] Implement data fetching and state management
- [ ] Add comprehensive testing
- [ ] Performance optimization
- [ ] Security audit

### Phase 5: Deployment & Production
- [ ] Create production Docker images
- [ ] Set up Kubernetes manifests
- [ ] Configure CI/CD pipeline
- [ ] Set up monitoring and logging
- [ ] Deploy to production environment

## API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Officials
- `GET /api/officials` - List officials (with search/filter)
- `GET /api/officials/:id` - Get official details
- `POST /api/officials` - Create official (admin only)
- `PUT /api/officials/:id` - Update official (admin only)

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports` - Submit new report
- `GET /api/reports/:id` - Get report details

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, please open an issue on GitHub.
