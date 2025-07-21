import React from 'react';

export default function EmailTemplate(confirmLink: string) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333333" }}>
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#f8f9fa",
        }}
      >
        <tr>
          <td style={{ padding: "20px" }}>
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <tr>
                <td
                  style={{
                    backgroundColor: "#6B4A52",  // couleur principale foncée
                    padding: "30px 40px",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <h1
                    style={{
                      color: "#ffffff",
                      fontSize: "24px",
                      fontWeight: "bold",
                      margin: "0",
                      textAlign: "center",
                    }}
                  >
                    Votre Application
                  </h1>
                </td>
              </tr>

              {/* Content */}
              <tr>
                <td style={{ padding: "40px" }}>
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      color: "#57373F",  // un ton un peu plus clair que le header
                      marginBottom: "20px",
                      marginTop: "0",
                    }}
                  >
                    Réinitialisation de votre mot de passe
                  </h2>

                  <p
                    style={{
                      color: "#6B4A52",
                      marginBottom: "20px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    Bonjour,
                  </p>

                  <p
                    style={{
                      color: "#6B4A52",
                      marginBottom: "30px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous êtes à
                    l'origine de cette demande, cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
                  </p>

                  {/* Reset Button */}
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ width: "100%", marginBottom: "30px" }}>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <a
                          href={confirmLink}
                          style={{
                            display: "inline-block",
                            backgroundColor: "#6B4A52", // bouton couleur principale
                            color: "#ffffff",
                            textDecoration: "none",
                            padding: "16px 32px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "600",
                            border: "none",
                          }}
                        >
                          Réinitialiser mon mot de passe
                        </a>
                      </td>
                    </tr>
                  </table>

                  {/* Warning Box */}
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{
                      width: "100%",
                      backgroundColor: "#F3E8E8", // couleur douce dans la palette rose/pêche très clair
                      border: "1px solid #B37A82", // bordure en ton foncé #B37A82, proche de la palette
                      borderRadius: "6px",
                      marginBottom: "25px",
                    }}
                  >
                    <tr>
                      <td style={{ padding: "15px" }}>
                        <p
                          style={{
                            color: "#7F414B", // texte warning foncé
                            fontSize: "14px",
                            margin: "0",
                            lineHeight: "1.4",
                          }}
                        >
                          <strong>Important :</strong> Ce lien expirera dans 24 heures pour des raisons de sécurité.
                        </p>
                      </td>
                    </tr>
                  </table>

                  <p
                    style={{
                      color: "#6B4A52",
                      marginBottom: "20px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
                    Votre mot de passe actuel restera inchangé.
                  </p>

                  <p
                    style={{
                      color: "#6B4A52",
                      marginBottom: "15px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :
                  </p>

                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{
                      width: "100%",
                      backgroundColor: "#F9F6F6", // fond très clair neutre
                      border: "1px solid #D1B9B9", // bordure rose/gris clair
                      borderRadius: "4px",
                      marginBottom: "25px",
                    }}
                  >
                    <tr>
                      <td style={{ padding: "12px" }}>
                        <p
                          style={{
                            color: "#8B6B70", // texte gris rosé
                            fontSize: "14px",
                            margin: "0",
                            wordBreak: "break-all",
                          }}
                        >
                          {confirmLink}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <p
                    style={{
                      color: "#6B4A52",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      marginBottom: "0",
                    }}
                  >
                    Cordialement,
                    <br />
                    L'équipe de Votre Application
                  </p>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td
                  style={{
                    backgroundColor: "#F9F6F6",
                    padding: "30px 40px",
                    borderTop: "1px solid #E1D8D8",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  <table cellPadding="0" cellSpacing="0" border={0} style={{ width: "100%" }}>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <p
                          style={{
                            color: "#8B6B70",
                            fontSize: "14px",
                            margin: "0 0 8px 0",
                          }}
                        >
                          Votre Application - 123 Rue Example, 75001 Paris
                        </p>
                        <p
                          style={{
                            color: "#B7A3A4",
                            fontSize: "12px",
                            margin: "0 0 15px 0",
                          }}
                        >
                          Cet email a été envoyé à votre adresse car vous avez un compte sur notre plateforme.
                        </p>
                        <p
                          style={{
                            color: "#6B4A52",
                            fontSize: "14px",
                            margin: "0",
                          }}
                        >
                          <a href="#" style={{ color: "#6B4A52", textDecoration: "none" }}>
                            Centre d'aide
                          </a>
                          <span style={{ color: "#B7A3A4", margin: "0 8px" }}>•</span>
                          <a href="#" style={{ color: "#6B4A52", textDecoration: "none" }}>
                            Nous contacter
                          </a>
                          <span style={{ color: "#B7A3A4", margin: "0 8px" }}>•</span>
                          <a href="#" style={{ color: "#6B4A52", textDecoration: "none" }}>
                            Politique de confidentialité
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  )
}
