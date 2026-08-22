# -*- coding: utf-8 -*-
"""Genere les 3 figures d'architecture pour le PDF technique."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

RED = "#B0000E"
DARK = "#1F2937"
GREY = "#6B7280"
BORDER = "#E5E7EB"
BG = "#F7F8FA"

plt.rcParams["font.family"] = "DejaVu Sans"


def box(ax, x, y, w, h, title, sub=None, fc="white", ec=BORDER, tc=DARK, title_size=11):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.03",
                                fc=fc, ec=ec, lw=1.4))
    if sub:
        ax.text(x + w / 2, y + h * 0.62, title, ha="center", va="center",
                fontsize=title_size, fontweight="bold", color=tc)
        ax.text(x + w / 2, y + h * 0.28, sub, ha="center", va="center",
                fontsize=8.5, color=GREY)
    else:
        ax.text(x + w / 2, y + h / 2, title, ha="center", va="center",
                fontsize=title_size, fontweight="bold", color=tc)


def arrow(ax, x1, y1, x2, y2, label=None, color=DARK, style="-|>", lw=1.6, label_dy=0.035):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style,
                                 mutation_scale=14, color=color, lw=lw))
    if label:
        ax.text((x1 + x2) / 2, (y1 + y2) / 2 + label_dy, label, ha="center",
                va="bottom", fontsize=8.5, color=color, style="italic")


# ---------------- Figure 1 : architecture globale ----------------
fig, ax = plt.subplots(figsize=(9.2, 5.2))
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
fig.patch.set_facecolor("white")

box(ax, 0.03, 0.72, 0.24, 0.20, "Claude Desktop / Cursor", "client MCP (LLM)")
box(ax, 0.03, 0.38, 0.24, 0.20, "SPA React 19", "navigateur utilisateur")
box(ax, 0.38, 0.55, 0.24, 0.20, "mcp-server", "Node 20 + SDK MCP\nstdio, 8 outils")
box(ax, 0.73, 0.55, 0.24, 0.20, "Backend Spring Boot 3", "API REST, JWT, JPA\nJava 21, port 8080", fc="#FDF2F2", ec=RED)
box(ax, 0.73, 0.13, 0.24, 0.18, "PostgreSQL 16", "issues, users, projects\ncomments, attachments")

arrow(ax, 0.27, 0.82, 0.38, 0.70, "MCP / stdio")
arrow(ax, 0.62, 0.65, 0.73, 0.65, "HTTP + JWT")
arrow(ax, 0.27, 0.48, 0.73, 0.50, "HTTPS + JWT", label_dy=0.045)
arrow(ax, 0.85, 0.55, 0.85, 0.31, "JPA / Hibernate", label_dy=0.02)

ax.text(0.5, 0.02, "Un seul contrat REST — deux surfaces clientes (humaine et agent IA).",
        ha="center", fontsize=9, color=GREY, style="italic")
fig.savefig("/tmp/pdf-fig1.png", dpi=150, bbox_inches="tight")
plt.close(fig)

# ---------------- Figure 2 : flux JWT ----------------
fig, ax = plt.subplots(figsize=(9.2, 5.6))
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")

actors = [("Client\n(SPA / MCP)", 0.16), ("Backend\nSpring Boot", 0.55), ("PostgreSQL", 0.88)]
for name, x in actors:
    box(ax, x - 0.10, 0.88, 0.20, 0.10, name, fc=BG)
    ax.plot([x, x], [0.06, 0.88], color=BORDER, lw=1.2, ls="--")

def msg(y, x1, x2, label, color=DARK, ret=False):
    arrow(ax, x1, y, x2, y, None, color=color, style="-|>" if not ret else "-|>",
          lw=1.5)
    ax.text((x1 + x2) / 2, y + 0.015, label, ha="center", fontsize=8.5,
            color=color, style="italic" if ret else "normal")

msg(0.80, 0.16, 0.55, "1. POST /api/auth/login (email, mot de passe)")
msg(0.72, 0.55, 0.88, "2. verification BCrypt", GREY)
msg(0.64, 0.55, 0.16, "3. access token JWT (15 min) + refresh token (7 j)", RED, ret=True)
msg(0.54, 0.16, 0.55, "4. GET /api/issues — en-tete Authorization: Bearer <jwt>")
msg(0.46, 0.55, 0.55, "", GREY)
ax.text(0.55, 0.44, "5. JwtAuthenticationFilter : signature HMAC-SHA,\nexpiration, role -> SecurityContext -> @PreAuthorize",
        ha="center", fontsize=8.5, color=DARK,
        bbox=dict(boxstyle="round,pad=0.35", fc="#FDF2F2", ec=RED, lw=1))
msg(0.32, 0.55, 0.16, "6. 200 OK (donnees) ou 403 (role insuffisant)", ret=True)
msg(0.24, 0.16, 0.55, "7. si 401 (token expire) : POST /api/auth/refresh", GREY)
msg(0.16, 0.55, 0.16, "8. nouveau JWT -> rejeu automatique de la requete", RED, ret=True)

fig.savefig("/tmp/pdf-fig2.png", dpi=150, bbox_inches="tight")
plt.close(fig)

# ---------------- Figure 3 : cycle MCP ----------------
fig, ax = plt.subplots(figsize=(9.2, 4.6))
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")

actors = [("Claude Desktop", 0.14), ("mcp-server\n(stdio)", 0.47), ("Backend REST", 0.82)]
for name, x in actors:
    box(ax, x - 0.11, 0.86, 0.22, 0.11, name, fc=BG)
    ax.plot([x, x], [0.05, 0.86], color=BORDER, lw=1.2, ls="--")

msg(0.76, 0.14, 0.47, "1. initialize + tools/list (JSON-RPC sur stdio)")
msg(0.66, 0.47, 0.14, "2. schemas zod des 8 outils", ret=True)
msg(0.54, 0.14, 0.47, "3. tools/call : search_issues {status:'OPEN'}", RED)
msg(0.44, 0.47, 0.82, "4. GET /api/issues?status=OPEN (Bearer JWT)")
msg(0.34, 0.82, 0.47, "5. 200 OK — JSON metier", ret=True)
msg(0.24, 0.47, 0.14, "6. content[] texte formate pour le LLM", ret=True)
ax.text(0.47, 0.12, "si erreur backend (4xx/409) : isError=true + message d'origine relaye",
        ha="center", fontsize=8.5, color=RED,
        bbox=dict(boxstyle="round,pad=0.3", fc="#FDF2F2", ec=RED, lw=1))

fig.savefig("/tmp/pdf-fig3.png", dpi=150, bbox_inches="tight")
plt.close(fig)

print("figures OK")
