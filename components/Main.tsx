// import * as React from "react";
// import { useEffect, useState } from "react";
// import OrgChartComponent from "./OrgChartComponent";
// import mockData from "./mockData";

// const Main = (props: any) => {
//   const [data, setData] = useState<any[]>([]);
//   const [mapping, setMapping] = useState<any>(null);
//   const [searchOngoing, setSearchOngoing] = useState(true);

//   const zoomRef = React.useRef<any>(null);
//   const searchRef = React.useRef<any>(null);
//   const searchNextRef = React.useRef<any>(null);

//   useEffect(() => {
//     try {
//       const mappingJson = JSON.parse(
//         props.JsonMapping || `{
//           "recordIdField": "accountid",
//           "parentField": "parentaccountid",
//           "mapping": ["name", "telephone1"],
//           "width": 1200,
//           "height": 600
//         }`
//       );
//       setMapping(mappingJson);

//       const structured = formatData(mockData, mappingJson);
//       console.log("Final structured data going to OrgChart:", structured);
//       setData(structured);
//     } catch (err) {
//       console.error("Failed to parse JSON mapping or format data:", err);
//     }
//   }, []);

//   const formatData = (records: any[], mapping: any): any[] => {
//     const nodeMap = new Map<string, any>();
//     const roots: any[] = [];

//     records.forEach((rec) => {
//       const node = {
//         id: rec[mapping.recordIdField],
//         parentId: rec[mapping.parentField] || null,
//         name: rec[mapping.mapping[0]],
//         phone: rec[mapping.mapping[1]],
//         state: rec.statecode ?? "Unknown",
//         children: []
//       };
//       nodeMap.set(node.id, node);
//     });

//     nodeMap.forEach((node) => {
//       if (node.parentId && nodeMap.has(node.parentId)) {
//         nodeMap.get(node.parentId).children.push(node);
//       } else {
//         roots.push(node);
//       }
//     });

//     return roots;
//   };

//   const zoom = (type: string) => zoomRef.current?.[type]?.();
//   const search = (value: string) => {
//     searchRef.current?.(value);
//     setSearchOngoing(!value);
//   };
//   const searchNext = () => searchNextRef.current?.();

//   return (
//     <div>
//       <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
//         <button onClick={() => zoom("zoomIn")}>Zoom In</button>
//         <button onClick={() => zoom("zoomOut")}>Zoom Out</button>
//         <button onClick={() => zoom("zoomToFit")}>Fit</button>
//         <input placeholder="Search by name" onChange={(e) => search(e.target.value)} />
//         <button onClick={searchNext} disabled={searchOngoing}>Next</button>
//       </div>

//       <div
//         style={{
//           width: mapping?.width || 1200,
//           height: mapping?.height || 600,
//           border: "1px solid #ccc"
//         }}
//       >
//         <OrgChartComponent
//           data={data}
//           setZoom={(z) => (zoomRef.current = z)}
//           setSearch={(s) => (searchRef.current = s)}
//           setSearchNext={(n) => (searchNextRef.current = n)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Main;


// Updated Main.tsx with record-centric filtering for Microsoft-style account hierarchy

import * as React from "react";
import { useEffect, useState } from "react";
import OrgChartComponent from "./OrgChartComponent";
import mockData from "./mockData"; // Replace with CRM data in production

const Main = (props: any) => {
  const [data, setData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<any>(null);
  const [searchOngoing, setSearchOngoing] = useState(true);

  const zoomRef = React.useRef<any>(null);
  const searchRef = React.useRef<any>(null);
  const searchNextRef = React.useRef<any>(null);

  useEffect(() => {
    try {
      const mappingJson = JSON.parse(
        props.JsonMapping || `{
          "recordIdField": "accountid",
          "parentField": "parentaccountid",
          "mapping": ["name", "telephone1"]
        }`
      );
      setMapping(mappingJson);

      const focusedId = props.context.parameters.FocusedRecordId?.raw;
      if (!focusedId) {
        console.warn("No FocusedRecordId provided.");
        setData([]);
        return;
      }

      const filteredTree = getRecordCentricHierarchy(mockData, focusedId, mappingJson);
      setData(filteredTree ? [filteredTree] : []);
    } catch (err) {
      console.error("Failed to parse JSON mapping or format data:", err);
    }
  }, [props.context.parameters.FocusedRecordId?.raw]);

  const getRecordCentricHierarchy = (records: any[], recordId: string, mapping: any): any | null => {
    const map = new Map<string, any>();

    records.forEach((rec) => {
      const node = {
        id: rec[mapping.recordIdField],
        parentId: rec[mapping.parentField] || null,
        name: rec[mapping.mapping[0]],
        phone: rec[mapping.mapping[1]],
        state: rec.statecode ?? "Unknown",
        children: []
      };
      map.set(node.id, node);
    });

    // Link children to parents
    map.forEach((node) => {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId).children.push(node);
      }
    });

    // Climb to the topmost ancestor
    let current = map.get(recordId);
    if (!current) return null;

    while (current.parentId && map.has(current.parentId)) {
      current = map.get(current.parentId);
    }

    return current;
  };

  const zoom = (type: string) => zoomRef.current?.[type]?.();
  const search = (value: string) => {
    searchRef.current?.(value);
    setSearchOngoing(!value);
  };
  const searchNext = () => searchNextRef.current?.();

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button onClick={() => zoom("zoomIn")}>Zoom In</button>
        <button onClick={() => zoom("zoomOut")}>Zoom Out</button>
        <button onClick={() => zoom("zoomToFit")}>Fit</button>
        <input placeholder="Search by name" onChange={(e) => search(e.target.value)} />
        <button onClick={searchNext} disabled={searchOngoing}>Next</button>
      </div>

      <div style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}>
        <OrgChartComponent
          data={data}
          setZoom={(z) => (zoomRef.current = z)}
          setSearch={(s) => (searchRef.current = s)}
          setSearchNext={(n) => (searchNextRef.current = n)}
        />
      </div>
    </div>
  );
};

export default Main;

