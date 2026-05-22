import React from 'react';

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const { id, title, description, dueDate, priority, category, status } = task;

  const isCompleted = status === 'Completed';

  const getDueDateStatus = () => {
    if (isCompleted) return 'normal';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate < today) return 'overdue';
    if (taskDate.getTime() === today.getTime()) return 'today';
    return 'upcoming';
  };

  const dueDateStatus = getDueDateStatus();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Work': return 'bi-briefcase';
      case 'Personal': return 'bi-person';
      case 'Shopping': return 'bi-cart3';
      case 'Health': return 'bi-heart-pulse';
      case 'Finance': return 'bi-wallet2';
      default: return 'bi-tag';
    }
  };

  const formatDueDate = (dateStr) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 animate-fade-in">
      <div className={`card glass-card h-100 ${isCompleted ? 'border-success border-opacity-25' : ''}`}>
        <div className="card-body d-flex flex-column text-start">
          {/* Header Category and Priority */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge rounded-pill bg-light text-dark border d-flex align-items-center gap-1 py-2 px-3">
              <i className={`bi ${getCategoryIcon(category)} text-primary`}></i>
              {category}
            </span>
            <span className={`badge rounded-pill priority-badge-${priority} py-2 px-3`}>
              {priority}
            </span>
          </div>

          {/* Title and Description */}
          <h5 className={`card-title fw-bold mb-2 ${isCompleted ? 'task-completed-text text-secondary' : ''}`} style={{ color: 'var(--text-primary)' }}>
            {title}
          </h5>
          <p className={`card-text text-secondary mb-4 flex-grow-1 ${isCompleted ? 'text-decoration-line-through opacity-50' : ''}`} style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            {description || <em className="text-muted">No description provided.</em>}
          </p>

          {/* Due Date Indicator */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className={`bi bi-calendar3 ${dueDateStatus === 'overdue' ? 'text-danger' : dueDateStatus === 'today' ? 'text-warning' : 'text-muted'}`}></i>
            <span className={`small fw-semibold ${dueDateStatus === 'overdue' ? 'text-danger fw-bold' : dueDateStatus === 'today' ? 'text-warning' : 'text-secondary'}`}>
              Due: {formatDueDate(dueDate)}
              {dueDateStatus === 'overdue' && ' (Overdue)'}
              {dueDateStatus === 'today' && ' (Today!)'}
            </span>
          </div>

          <hr className="my-3 opacity-10" />

          {/* Action Row */}
          <div className="d-flex justify-content-between align-items-center mt-auto">
            {/* Status Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm glass-input py-1 px-2 border-0 bg-opacity-10 fw-semibold"
                style={{ fontSize: '0.8rem', cursor: 'pointer', minWidth: '110px' }}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            {/* Edit / Delete Buttons */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-primary border-0 rounded-circle"
                title="Edit Task"
                onClick={() => onEdit(task)}
                style={{ width: '32px', height: '32px', padding: 0 }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                title="Delete Task"
                onClick={() => onDelete(id)}
                style={{ width: '32px', height: '32px', padding: 0 }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
