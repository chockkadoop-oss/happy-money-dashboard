// ===== Happy Money — เมนูนำทางส่วนกลาง (ใช้ร่วมกันทุกหน้า) =====
// ต่อไปนี้ต้องการเพิ่ม/ลบ/แก้ไข/สลับลำดับเมนู แก้แค่ไฟล์นี้ไฟล์เดียว
// ไม่ต้องตามไปแก้ index.html / tax.html / loan.html ทีละไฟล์อีก
//
// วิธีใช้ในแต่ละหน้า:
//   1) เพิ่มบรรทัดนี้ "ก่อน" script หลักของหน้านั้น (หลัง babel.min.js):
//        <script type="text/babel" data-presets="react" src="nav.js"></script>
//   2) ลบ function CrossLink() { ... } เดิมของหน้านั้นทิ้ง (ถ้ามี) — ตัวที่
//      ประกาศทีหลังจะทับตัวที่ไฟล์นี้ประกาศไว้เสมอ ถ้าไม่ลบเมนูจะไม่ถูกแชร์จริง
//   3) เรียกใช้แทนที่โค้ดเมนูเดิมด้วย <CrossLink active="finance" />
//      (เปลี่ยน "finance" เป็น "tax" หรือ "loan" ตามหน้านั้น ๆ)
//
// หมายเหตุ: ไฟล์นี้จงใจไม่ทำ `const { useState, useEffect } = React` แบบที่
// แต่ละหน้าทำกัน เพราะถ้าประกาศ const ชื่อซ้ำกันคนละ <script> บนหน้าเดียวกัน
// จะชนกัน (SyntaxError) — ไฟล์นี้เรียก React.useState / React.useEffect ตรง ๆ
// แทน เพื่อไม่ไปแตะ/ชนกับตัวแปรของหน้าอื่นเลย

// รายการเมนู — เพิ่มหรือลบ object ในอาร์เรย์นี้เพื่อเพิ่ม/ลบ feature ใหม่
// key   = ชื่อที่ส่งเข้า prop active ของ <CrossLink active="..." />
// label = ข้อความที่แสดงบนปุ่ม
// href  = ไฟล์ปลายทางเมื่อกด (ต้องอยู่โฟลเดอร์เดียวกัน)
// color = สีเน้นตอนเป็นแท็บที่กำลังเปิดอยู่ (ให้ตรงกับโทนสีเดิมของแต่ละหน้า)
var HAPPY_MONEY_NAV_ITEMS = [
  { key: "finance", label: "Financial", href: "index.html", color: "#2F5D46" },
  { key: "tax", label: "Tax", href: "tax.html", color: "#2B4C6F" },
  { key: "loan", label: "Loan", href: "loan.html", color: "#7A2E1F" },
  { key: "tasks", label: "Tasks", href: "tasks.html", color: "#7A4F22" },
];

// สไตล์เดียวกับที่ tax.html/loan.html ใช้อยู่แล้ว (sticky บนสุด, พับ/ขยายตาม
// ความกว้างจอ) — index.html เดิมไม่ sticky แต่รวมเป็นแบบเดียวกันเพื่อความง่าย
// ในการดูแล ถ้าอยากแยกพฤติกรรมกันทีหลัง ค่อยเพิ่ม prop เช่น sticky={false}
function CrossLink({ active }) {
  var widthState = React.useState(typeof window !== "undefined" ? window.innerWidth : 480);
  var vw = widthState[0];
  var setVw = widthState[1];
  React.useEffect(function () {
    var onResize = function () { setVw(window.innerWidth); };
    window.addEventListener("resize", onResize);
    return function () { window.removeEventListener("resize", onResize); };
  }, []);
  var isDesktop = vw >= 1024;
  var isTablet = vw >= 640;
  var navMax = isDesktop ? 1040 : isTablet ? 640 : 480;

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#F6F3EC", borderBottom: "1px solid #E6E0D2", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: navMax, display: "flex", gap: 8, padding: "14px 16px 10px" }}>
        {HAPPY_MONEY_NAV_ITEMS.map(function (item) {
          var isActive = item.key === active;
          var itemStyle = {
            flex: 1, padding: "10px 12px", borderRadius: 12, textAlign: "center",
            fontFamily: "'IBM Plex Sans Thai', sans-serif", fontWeight: 600, fontSize: 13,
            textDecoration: "none",
            border: isActive ? ("1.5px solid " + item.color) : "1px solid #E6E0D2",
            background: isActive ? item.color : "#FFFFFF",
            color: isActive ? "#FFFFFF" : "#6B6459",
          };
          return isActive
            ? <span key={item.key} style={itemStyle}>{item.label}</span>
            : <a key={item.key} href={item.href} style={itemStyle}>{item.label}</a>;
        })}
      </div>
    </div>
  );
}
