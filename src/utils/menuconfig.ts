// utils/menuConfig.ts
export const menuConfig: Record<string, { section: string; items: { label: string; active?: boolean }[] }[]> = {
  direktur: [
    {
      section: "Projects",
      items: [
        { label: "📌 Strategic Overview", active: true },
        { label: "📊 Project Portfolio" },
        { label: "📈 KPI Dashboard" },
      ],
    },
    {
      section: "Meetings",
      items: [
        { label: "📅 Scheduled Meetings" },
        { label: "📝 Meeting Minutes" },
      ],
    },
  ],
  pic: [
    {
      section: "My Projects",
      items: [
        { label: "📌 Project A.1" },
        { label: "📌 Project B.1" },
        { label: "📌 Multi-Project View", active: true },
      ],
    },
    {
      section: "RFC Implementation",
      items: [
        { label: "✅ Approved RFCs" },
        { label: "🚀 Sprint Creation" },
        { label: "📊 RFC Progress" },
        { label: "🔗 Integration Tasks" },
      ],
    },
    {
      section: "Team Management",
      items: [
        { label: "👥 Resource Assignment" },
        { label: "⏱ Time Tracking" },
        { label: "📋 Task Management" },
      ],
    },
  ],
  kapokja: [
    {
      section: "My Pokjas",
      items: [
        { label: "📌 Pokja A", active: true },
        { label: "📌 Pokja C" },
        { label: "📌 Cross-Pokja View" },
      ],
    },
    {
      section: "RFC Technical Review",
      items: [
        { label: "📝 Pending Approvals" },
        { label: "⚙️ Technical Assessment" },
        { label: "📊 Impact Analysis" },
        { label: "✅ Approved RFCs" },
      ],
    },
    {
      section: "Projects",
      items: [
        { label: "📌 Project A.1" },
        { label: "📌 Project A.2" },
        { label: "📌 Project C.1" },
        { label: "📌 Project C.2" },
      ],
    },
  ],
  client: [
    {
      section: "RFC Management",
      items: [
        { label: "📝 Submit New RFC", active: true },
        { label: "📂 My RFCs" },
        { label: "📊 RFC Status" },
        { label: "📈 Progress Tracking" },
      ],
    },
    {
      section: "Digital Signature",
      items: [
        { label: "⏳ Pending TTE" },
        { label: "✅ Signed Documents" },
        { label: "📜 Certificate Management" },
      ],
    },
    {
      section: "Communication",
      items: [
        { label: "🔔 Notifications" },
        { label: "📅 Meeting Schedule" },
        { label: "💬 Discussion Thread" },
      ],
    },
  ],
};
