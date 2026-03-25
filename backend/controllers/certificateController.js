import path from "path";
import PDFDocument from "pdfkit";
import User from "../models/user.js";

export const generateCertificate = async (req, res) => {

  try {

    const { userId, reward, lang = "en" } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
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
      layout: "landscape"
    });

    const fontPath = path.join(process.cwd(), "fonts", "NotoSans-Regular.ttf");
    doc.font(fontPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate.pdf`
    );

    doc.pipe(res);

    // 🎨 BACKGROUND BORDER
    doc.rect(20, 20, 800, 550)
      .lineWidth(4)
      .stroke("#16a34a");

    doc.rect(30, 30, 780, 530)
      .lineWidth(1)
      .stroke("#16a34a");

    // 🟢 LOGO (optional)
    try {
      const logoPath = path.join(process.cwd(), "uploads", "logo.png"); // add logo file
      doc.image(logoPath, 60, 50, { width: 80 });
    } catch (e) {
      console.log("Logo not found, skipping...");
    }

    // 🏆 TITLE
    doc
      .fontSize(32)
      .fillColor("#16a34a")
      .text(t.title, 0, 120, { align: "center" });

    doc.moveDown(2);

    // 📜 LINE 1
    doc
      .fontSize(18)
      .fillColor("black")
      .text(t.line1, { align: "center" });

    doc.moveDown();

    // 👤 USER NAME
    doc
      .fontSize(28)
      .fillColor("#16a34a")
      .text(user.name, { align: "center", underline: true });

    doc.moveDown();

    // 📜 LINE 2
    doc
      .fontSize(18)
      .fillColor("black")
      .text(t.line2, { align: "center" });

    doc.moveDown();

    // 🎁 REWARD
    doc
      .fontSize(20)
      .fillColor("#16a34a")
      .text(reward, { align: "center" });

    doc.moveDown(3);

    // ✍️ SIGNATURE SECTION
    doc.fontSize(14).fillColor("black");

    doc.text("____________________", 150, 450);
    doc.text("Authority Signature", 150, 470);

    doc.text("____________________", 550, 450);
    doc.text("Project Head", 550, 470);

    // 📅 DATE
    doc.text(
      `${t.date}: ${new Date().toLocaleDateString()}`,
      0,
      520,
      { align: "center" }
    );

    // 🏢 FOOTER
    doc
      .fontSize(12)
      .fillColor("gray")
      .text(t.issued, 0, 550, { align: "center" });

    doc.end();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Certificate generation failed"
    });

  }

};