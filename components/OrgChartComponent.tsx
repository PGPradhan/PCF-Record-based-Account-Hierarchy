// import * as React from 'react';
// import { useLayoutEffect, useRef } from 'react';
// import { OrgChart } from 'd3-org-chart';
// import { renderToStaticMarkup } from 'react-dom/server';

// interface OrgChartItem {
//   id: string;
//   parentId?: string;
//   name?: string;
//   phone?: string;
//   state?: string | number;
//   [key: string]: any;
// }

// interface OrgChartComponentProps {
//   data: OrgChartItem | OrgChartItem[];
//   setZoom?: (zoomFuncs: { zoomIn: () => void; zoomOut: () => void; zoomToFit: () => void }) => void;
//   setSearch?: (searchFunc: (term: string) => void) => void;
//   setSearchNext?: (nextFunc: () => void) => void;
// }

// const OrgChartComponent: React.FC<OrgChartComponentProps> = ({ data, setZoom, setSearch, setSearchNext }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<OrgChart<OrgChartItem> | null>(null);
//   const searchResultsRef = useRef<OrgChartItem[]>([]);
//   const searchIndexRef = useRef<number>(0);

//   const renderNodeContent = (d: any) => {
//     const nodeData = d.data as OrgChartItem;
//     const name = nodeData.name || '';
//     const initials = name
//       .split(' ')
//       .map((p) => p[0])
//       .filter(Boolean)
//       .slice(0, 2)
//       .join('')
//       .toUpperCase();
//     const phone = nodeData.phone || nodeData.telephone1 || '';
//     const recordId = nodeData.id || '';

//     let stateText = '';
//     let stateColor = '#888';
//     if (typeof nodeData.state === 'number') {
//       stateText = nodeData.state === 0 ? 'Active' : 'Inactive';
//       stateColor = nodeData.state === 0 ? '#27ae60' : '#c0392b';
//     } else if (typeof nodeData.state === 'string') {
//       stateText = nodeData.state;
//       const st = stateText.toLowerCase();
//       if (st === 'active') stateColor = '#27ae60';
//       else if (st === 'inactive') stateColor = '#c0392b';
//     }

//     return (
//       <div style={{
//         backgroundColor: '#fff',
//         borderRadius: '10px',
//         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         padding: 16,
//         width: '280px',
//         fontFamily: 'Segoe UI, sans-serif'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{
//             width: 60,
//             height: 60,
//             borderRadius: '50%',
//             background: '#0078d4',
//             color: '#fff',
//             textAlign: 'center',
//             lineHeight: '60px',
//             fontSize: 20,
//             fontWeight: 'bold',
//             marginRight: 12
//           }}>{initials}</div>
//           <div>
//             <div style={{ fontSize: 16, fontWeight: 600 }}>{name}</div>
//             <div style={{ fontSize: 13, color: '#666' }}>Phone: {phone}</div>
//             <div style={{ fontSize: 12, color: '#aaa' }}>ID: {recordId}</div>
//           </div>
//         </div>
//         <div style={{ marginTop: 10 }}>
//           <span style={{
//             backgroundColor: stateColor,
//             color: '#fff',
//             fontSize: 12,
//             padding: '4px 8px',
//             borderRadius: 12
//           }}>{stateText}</span>
//         </div>
//       </div>
//     );
//   };
  
//   function flattenTree(nodes: any[]): any[] {
//   const flat: any[] = [];

//   function recurse(node: any) {
//     const { children, ...rest } = node;
//     flat.push(rest);
//     if (children && Array.isArray(children)) {
//       children.forEach(recurse);
//     }
//   }

//   nodes.forEach(recurse);
 
//   return flat;
// }

//   useLayoutEffect(() => {
//     if (!containerRef.current || !data || (Array.isArray(data) && data.length === 0)) {
//       console.warn('ORG CHART - Data is empty');
//       return;
//     }

//     const chart = new OrgChart<OrgChartItem>();
//     chartRef.current = chart;

//     chart
//       .container(containerRef.current as any)
//       .data(flattenTree(Array.isArray(data) ? data : [data]))
//       .nodeWidth(() => 300)
//       .nodeHeight(() => 150)
//       .compactMarginBetween(() => 80)
//       .setActiveNodeCentered(true)
//       .initialZoom(0.8)
//       .nodeContent((d: any) => renderToStaticMarkup(renderNodeContent(d)))
//       .render();

//     if (setZoom) {
//       setZoom({
//         zoomIn: () => chart.zoomIn(),
//         zoomOut: () => chart.zoomOut(),
//         zoomToFit: () => chart.fit()
//       });
//     }

//     if (setSearch) {
//       setSearch((term: string) => {
//         if (!term) {
//           chart.clearHighlighting();
//           searchResultsRef.current = [];
//           searchIndexRef.current = 0;
//           chart.render();
//           return;
//         }

//         const state = (chart as any).getChartState?.();
//         const allNodes = state?.allNodes || [];
//         const matches = allNodes.filter((n: any) => (n.data?.name || '').toLowerCase().includes(term.toLowerCase()));

//         chart.clearHighlighting();
//         matches.forEach((n: any) => chart.setHighlighted(n.id));
//         chart.render();

//         searchResultsRef.current = matches;
//         searchIndexRef.current = 0;

//         if (matches.length > 0) {
//           chart.setCentered(matches[0].id).render();
//         }
//       });
//     }

//     if (setSearchNext) {
//       setSearchNext(() => {
//         const matches = searchResultsRef.current;
//         if (!matches || matches.length === 0) return;

//         searchIndexRef.current = (searchIndexRef.current + 1) % matches.length;
//         const next = matches[searchIndexRef.current];
//         if (next) chartRef.current?.setCentered(next.id).render();
//       });
//     }

//     return () => {
//       chart.clearHighlighting();
//       if (containerRef.current) containerRef.current.innerHTML = '';
//       chartRef.current = null;
//     };
//   }, [data, setZoom, setSearch, setSearchNext]);

//   return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default OrgChartComponent;


// OrgChartComponent.tsx
import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';
import { renderToStaticMarkup } from 'react-dom/server';

interface OrgChartItem {
  id: string;
  parentId?: string;
  name?: string;
  phone?: string;
  state?: string | number;
  children?: OrgChartItem[];
  [key: string]: any;
}

interface OrgChartComponentProps {
  data: OrgChartItem[];
  focusedId?: string;
  setZoom?: (zoomFuncs: { zoomIn: () => void; zoomOut: () => void; zoomToFit: () => void }) => void;
  setSearch?: (searchFunc: (term: string) => void) => void;
  setSearchNext?: (nextFunc: () => void) => void;
}

const OrgChartComponent: React.FC<OrgChartComponentProps> = ({ data, focusedId, setZoom, setSearch, setSearchNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<OrgChart<OrgChartItem> | null>(null);
  const searchResultsRef = useRef<OrgChartItem[]>([]);
  const searchIndexRef = useRef<number>(0);

  const renderNodeContent = (d: any) => {
    const nodeData = d.data as OrgChartItem;
    const name = nodeData.name || '';
    const initials = name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const phone = nodeData.phone || nodeData.telephone1 || '';
    const recordId = nodeData.id || '';

    let stateText = '';
    let stateColor = '#888';
    if (typeof nodeData.state === 'number') {
      stateText = nodeData.state === 0 ? 'Active' : 'Inactive';
      stateColor = nodeData.state === 0 ? '#27ae60' : '#c0392b';
    } else if (typeof nodeData.state === 'string') {
      stateText = nodeData.state;
      const st = stateText.toLowerCase();
      if (st === 'active') stateColor = '#27ae60';
      else if (st === 'inactive') stateColor = '#c0392b';
    }

    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: 16, width: '280px', fontFamily: 'Segoe UI, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#0078d4', color: '#fff', textAlign: 'center', lineHeight: '60px', fontSize: 20, fontWeight: 'bold', marginRight: 12 }}>{initials}</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 13, color: '#666' }}>Phone: {phone}</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>ID: {recordId}</div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ backgroundColor: stateColor, color: '#fff', fontSize: 12, padding: '4px 8px', borderRadius: 12 }}>{stateText}</span>
        </div>
      </div>
    );
  };

  const flattenTree = (nodes: OrgChartItem[]): OrgChartItem[] => {
    const flat: OrgChartItem[] = [];
    const recurse = (node: OrgChartItem) => {
      const { children, ...rest } = node;
      flat.push(rest);
      if (children && Array.isArray(children)) {
        children.forEach(recurse);
      }
    };
    nodes.forEach(recurse);
    return flat;
  };

  const findRootForFocused = (data: OrgChartItem[], focusId: string): OrgChartItem | null => {
    const idMap = new Map<string, OrgChartItem>();
    data.forEach((node) => idMap.set(node.id, node));

    let current = idMap.get(focusId);
    if (!current) return null;

    while (current.parentId && idMap.has(current.parentId)) {
      current = idMap.get(current.parentId)!;
    }

    return current;
  };

  useLayoutEffect(() => {
    if (!containerRef.current || !data || data.length === 0) return;

    const root = focusedId ? findRootForFocused(data, focusedId) : data[0];
    if (!root) return;

    const chart = new OrgChart<OrgChartItem>();
    chartRef.current = chart;

    chart
      .container(containerRef.current as any)
      .data(flattenTree([root]))
      .id('id')
      .parentNodeId((d: any) => d.parentId)
      .nodeWidth(() => 300)
      .nodeHeight(() => 150)
      .compactMarginBetween(() => 80)
      .setActiveNodeCentered(true)
      .initialZoom(0.8)
      .nodeContent((d: any) => renderToStaticMarkup(renderNodeContent(d)))
      .render();

    if (setZoom) {
      setZoom({ zoomIn: () => chart.zoomIn(), zoomOut: () => chart.zoomOut(), zoomToFit: () => chart.fit() });
    }

    if (setSearch) {
      setSearch((term: string) => {
        if (!term) {
          chart.clearHighlighting();
          searchResultsRef.current = [];
          searchIndexRef.current = 0;
          chart.render();
          return;
        }

        const state = (chart as any).getChartState?.();
        const allNodes = state?.allNodes || [];
        const matches = allNodes.filter((n: any) => (n.data?.name || '').toLowerCase().includes(term.toLowerCase()));

        chart.clearHighlighting();
        matches.forEach((n: any) => chart.setHighlighted(n.id));
        chart.render();

        searchResultsRef.current = matches;
        searchIndexRef.current = 0;

        if (matches.length > 0) {
          chart.setCentered(matches[0].id).render();
        }
      });
    }

    if (setSearchNext) {
      setSearchNext(() => {
        const matches = searchResultsRef.current;
        if (!matches || matches.length === 0) return;

        searchIndexRef.current = (searchIndexRef.current + 1) % matches.length;
        const next = matches[searchIndexRef.current];
        if (next) chartRef.current?.setCentered(next.id).render();
      });
    }

    return () => {
      chart.clearHighlighting();
      if (containerRef.current) containerRef.current.innerHTML = '';
      chartRef.current = null;
    };
  }, [data, focusedId, setZoom, setSearch, setSearchNext]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default OrgChartComponent;
