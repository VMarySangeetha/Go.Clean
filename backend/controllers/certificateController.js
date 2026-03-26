import path from "path";
import fs from "fs";
import PDFDocument from "pdfkit";
import User from "../models/user.js";

export const generateCertificate = async (req, res) => {
  try {
    const { userId, reward, lang = "en" } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🌍 TRANSLATIONS
    const translations = {
      en: {
        title: "Certificate of Appreciation",
        line1: "This certificate is proudly awarded to",
        line2: "For contributing to environmental cleanliness through",
        issued: "GO.CLEAN - Municipal Initiative",
        date: "Date"
      },
      hi: {
        title: "प्रशंसा प्रमाण पत्र",
        line1: "यह प्रमाण पत्र प्रदान किया जाता है",
        line2: "पर्यावरण स्वच्छता में योगदान के लिए",
        issued: "GO.CLEAN द्वारा जारी",
        date: "तारीख"
      },
      bn: {
        title: "সম্মাননা সনদ",
        line1: "এই সনদ প্রদান করা হচ্ছে",
        line2: "পরিবেশ পরিষ্কার রাখতে অবদানের জন্য",
        issued: "GO.CLEAN দ্বারা প্রদান করা হয়েছে",
        date: "তারিখ"
      },
      ta: {
        title: "பாராட்டு சான்றிதழ்",
        line1: "இந்த சான்றிதழ் வழங்கப்படுகிறது",
        line2: "சுற்றுச்சூழல் சுத்தத்திற்கு பங்களிப்புக்காக",
        issued: "GO.CLEAN வழங்கியது",
        date: "தேதி"
      },
      te: {
        title: "ప్రశంస పత్రం",
        line1: "ఈ సర్టిఫికేట్ అందజేయబడుతుంది",
        line2: "పర్యావరణ పరిశుభ్రతకు చేసిన సేవకు",
        issued: "GO.CLEAN ద్వారా జారీ చేయబడింది",
        date: "తేదీ"
      },
      mr: {
        title: "प्रशंसा प्रमाणपत्र",
        line1: "हे प्रमाणपत्र प्रदान करण्यात येते",
        line2: "पर्यावरण स्वच्छतेसाठी योगदानाबद्दल",
        issued: "GO.CLEAN कडून जारी",
        date: "दिनांक"
      },
      gu: {
        title: "પ્રશંસા પ્રમાણપત્ર",
        line1: "આ પ્રમાણપત્ર આપવામાં આવે છે",
        line2: "પર્યાવરણ સ્વચ્છતા માટે યોગદાન બદલ",
        issued: "GO.CLEAN દ્વારા જારી",
        date: "તારીખ"
      },
      kn: {
        title: "ಪ್ರಶಂಸಾ ಪ್ರಮಾಣಪತ್ರ",
        line1: "ಈ ಪ್ರಮಾಣಪತ್ರವನ್ನು ನೀಡಲಾಗಿದೆ",
        line2: "ಪರಿಸರ ಸ್ವಚ್ಛತೆಗೆ ಕೊಡುಗೆಗಾಗಿ",
        issued: "GO.CLEAN ಮೂಲಕ ನೀಡಲಾಗಿದೆ",
        date: "ದಿನಾಂಕ"
      },
      ml: {
        title: "പ്രശംസ സർട്ടിഫിക്കറ്റ്",
        line1: "ഈ സർട്ടിഫിക്കറ്റ് നൽകുന്നു",
        line2: "പരിസ്ഥിതി ശുചിത്വത്തിന് സംഭാവനയ്ക്ക്",
        issued: "GO.CLEAN നൽകി",
        date: "തീയതി"
      },
      pa: {
        title: "ਸਨਮਾਨ ਸਰਟੀਫਿਕੇਟ",
        line1: "ਇਹ ਸਰਟੀਫਿਕੇਟ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ",
        line2: "ਵਾਤਾਵਰਣ ਸਫਾਈ ਵਿੱਚ ਯੋਗਦਾਨ ਲਈ",
        issued: "GO.CLEAN ਵੱਲੋਂ ਜਾਰੀ",
        date: "ਤਾਰੀਖ"
      }
    };

    const t = translations[lang] || translations.en;

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 40
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");

    doc.pipe(res);

    // ✅ FONT SAFE LOAD (VERY IMPORTANT FIX)
    const fontPath = path.join(process.cwd(), "backend", "fonts", "NotoSans-Regular.ttf");
    if (fs.existsSync(fontPath)) {
      doc.font(fontPath);
    } else {
      console.log("⚠ Font not found, using default");
    }

    // 🎨 PREMIUM BORDER
    doc.rect(20, 20, 800, 550).lineWidth(3).stroke("#16a34a");
    doc.rect(30, 30, 780, 530).lineWidth(1).stroke("#16a34a");

    // 🟢 LOGO SAFE LOAD
    try {
      const logoPath = path.join(process.cwd(), "backend", "uploads", "logo.png");

      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 370, 50, { width: 80 });
      }
    } catch (err) {
      console.log("Logo error:", err.message);
    }

    // 🏆 TITLE
    doc
      .fontSize(32)
      .fillColor("#16a34a")
      .text(t.title, 0, 150, { align: "center" });

    // 📜 LINE 1
    doc
      .moveDown(1)
      .fontSize(16)
      .fillColor("black")
      .text(t.line1, { align: "center" });

    // 👤 NAME
    doc
      .moveDown(1)
      .fontSize(28)
      .fillColor("#16a34a")
      .text(user.name, { align: "center", underline: true });

    // 📜 LINE 2
    doc
      .moveDown(1)
      .fontSize(16)
      .fillColor("black")
      .text(t.line2, { align: "center" });

    // 🎁 REWARD
    doc
      .moveDown(1)
      .fontSize(18)
      .fillColor("#16a34a")
      .text(reward, { align: "center" });

    // ✍️ SIGNATURE LINES
    doc.moveTo(200, 430).lineTo(350, 430).stroke();
    doc.moveTo(500, 430).lineTo(650, 430).stroke();

    // ✍️ SIGNATURE TEXT
    doc.fontSize(12);
    doc.text("GO.CLEAN", 240, 435);
    doc.text("GO.CLEAN", 540, 435);

    doc.fontSize(10);
    doc.text("Authority Signature", 200, 450);
    doc.text("Project Head", 520, 450);

    // 📅 DATE
    doc
      .fontSize(12)
      .text(`${t.date}: ${new Date().toLocaleDateString()}`, 0, 500, {
        align: "center"
      });

    // 🏢 FOOTER
    doc
      .fontSize(10)
      .fillColor("gray")
      .text(t.issued, 0, 520, { align: "center" });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Certificate generation failed"
    });
  }
};