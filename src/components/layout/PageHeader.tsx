import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="page-title-box">
      <div className="page-title-left">
        <nav className="breadcrumb-nav" aria-label="breadcrumb">
          <Link to="/dashboard">Apartment Job</Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={12} className="separator" />
              {crumb.path ? (
                <Link to={crumb.path}>{crumb.label}</Link>
              ) : (
                <span className="active-crumb">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h4 className="page-title">{title}</h4>
        {description && <p className="page-description">{description}</p>}
      </div>

      {actions && <div className="page-title-right">{actions}</div>}
    </div>
  );
};

