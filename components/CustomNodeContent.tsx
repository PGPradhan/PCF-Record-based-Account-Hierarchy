import * as React from 'react';

interface OrgChartItem {
  id: string;
  parentId?: string | null;
  name?: string;
  phone?: string;
  state?: string | number;
  [key: string]: any;
}

interface CustomNodeContentProps {
  data: OrgChartItem;
}

const CustomNodeContent: React.FC<CustomNodeContentProps> = ({ data }) => {
  const name = data.name || '';
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const phone = data.phone || data.telephone1 || '';
  const recordId = data.id || '';

  let stateText = '';
  let stateColor = '#888';
  if (typeof data.state === 'number') {
    stateText = data.state === 0 ? 'Active' : 'Inactive';
    stateColor = data.state === 0 ? '#27ae60' : '#c0392b';
  } else if (typeof data.state === 'string') {
    stateText = data.state;
    const st = stateText.toLowerCase();
    if (st === 'active') stateColor = '#27ae60';
    else if (st === 'inactive') stateColor = '#c0392b';
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: 16,
      width: '280px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: '#0078d4',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '60px',
          fontSize: 20,
          fontWeight: 'bold',
          marginRight: 12
        }}>{initials}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 13, color: '#666' }}>Phone: {phone}</div>
          <div style={{ fontSize: 12, color: '#aaa' }}>ID: {recordId}</div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <span style={{
          backgroundColor: stateColor,
          color: '#fff',
          fontSize: 12,
          padding: '4px 8px',
          borderRadius: 12
        }}>{stateText}</span>
      </div>
    </div>
  );
};

export default CustomNodeContent;
