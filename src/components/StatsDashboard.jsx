import React from 'react';

export default function StatsDashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const active = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning, Hunter 🌅';
    if (hours < 18) return 'Good Afternoon, Hunter ☀️';
    return 'Good Evening, Hunter 🌙';
  };

  const getEncouragement = () => {
    if (total === 0) return "Create your first task to start hunting down those APIs!";
    if (completionRate === 100) return "Incredible! You've crushed every single task. 🎉";
    if (completionRate >= 75) return "Almost there! Keep up the amazing momentum. 💪";
    if (completionRate >= 50) return "Halfway through! You're making solid progress. 🚀";
    if (completionRate > 0) return "Nice start! Keep ticking those items off your list. 👍";
    return "Time to get started! Let's complete at least one task today.";
  };

  return (
    <div className="glass-card p-4 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="row align-items-center">
        {/* Welcome Section */}
        <div className="col-lg-6 mb-4 mb-lg-0 text-start">
          <h2 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{getGreeting()}</h2>
          <p className="text-secondary mb-3">{getEncouragement()}</p>
          
          <div className="d-flex align-items-center gap-3">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Overall Completion</span>
                <span className="fw-semibold text-primary">{completionRate}%</span>
              </div>
              <div className="progress dashboard-progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${completionRate}%`,
                    background: 'var(--primary-gradient)',
                    transition: 'width 0.6s ease'
                  }}
                  aria-valuenow={completionRate}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="col-lg-6">
          <div className="row g-3">
            {/* Total Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-3 rounded-4 text-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)' }}>
                <div className="fs-3 fw-bold" style={{ color: '#6366f1' }}>{total}</div>
                <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Total</div>
              </div>
            </div>

            {/* Active Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-3 rounded-4 text-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}>
                <div className="fs-3 fw-bold" style={{ color: '#3b82f6' }}>{active}</div>
                <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Active</div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-3 rounded-4 text-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                <div className="fs-3 fw-bold" style={{ color: '#10b981' }}>{completed}</div>
                <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Completed</div>
              </div>
            </div>

            {/* High Priority / Urgent */}
            <div className="col-6 col-sm-3">
              <div className="p-3 rounded-4 text-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
                <div className="fs-3 fw-bold" style={{ color: '#ef4444' }}>{highPriority}</div>
                <div className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Urgent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
