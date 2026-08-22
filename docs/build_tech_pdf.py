#!/usr/bin/env python3
"""Génère la documentation technique complète du projet Issue Tracker (PDF)."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    Image, PageBreak, Preformatted, KeepTogether, NextPageTemplate,
)

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'IssueTracker_Documentation_Technique.pdf')
ACCENT = HexColor('#B0000E')
DARK = HexColor('#333333')
GRAY = HexColor('#666666')
LIGHT = HexColor('#f5f5f5')

styles = getSampleStyleSheet()
BODY = ParagraphStyle('Body', parent=styles['Normal'], fontName='Times-Roman', fontSize=11,
                      leading=16.5, textColor=DARK, alignment=TA_JUSTIFY, spaceAfter=6)
H1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Times-Bold', fontSize=17,
                    leading=21, textColor=ACCENT, spaceBefore=18, spaceAfter=10)
H2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Times-Bold', fontSize=13.5,
                    leading=17, textColor=HexColor('#7a0a14'), spaceBefore=12, spaceAfter=6)
H3 = ParagraphStyle('H3', parent=styles['Heading3'], fontName='Times-Bold', fontSize=11.5,
                    leading=15, textColor=DARK, spaceBefore=8, spaceAfter=4)
CODE = ParagraphStyle('Code', fontName='Courier', fontSize=8, leading=10.5,
                      backColor=LIGHT, leftIndent=6, spaceBefore=4, spaceAfter=8)
CAPTION = ParagraphStyle('Caption', fontName='Times-Italic', fontSize=9, leading=12,
                         textColor=GRAY, alignment=TA_CENTER, spaceBefore=4, spaceAfter=10)
BULLET = ParagraphStyle('Bullet', parent=BODY, leftIndent=14, bulletIndent=4, spaceAfter=3)
CELL = ParagraphStyle('Cell', fontName='Times-Roman', fontSize=9.5, leading=12.5, textColor=DARK)
CELLB = ParagraphStyle('CellB', parent=CELL, fontName='Times-Bold')

story = []
fig_n = [0]
tab_n = [0]

def p(text, style=BODY):
    story.append(Paragraph(text, style))

def h1(text):
    story.append(Paragraph(f'<a name="{text[:20]}"/>' + text, H1))

def h2(text):
    story.append(Paragraph(text, H2))

def h3(text):
    story.append(Paragraph(text, H3))

def code(text):
    story.append(Preformatted(text.rstrip('\n'), CODE))

def bullets(items):
    for it in items:
        story.append(Paragraph(f'<bullet>&bull;</bullet>{it}', BULLET))

def table(headers, rows, widths):
    tab_n[0] += 1
    data = [[Paragraph(h, CELLB) for h in headers]]
    data += [[Paragraph(str(c), CELL) for c in r] for r in rows]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Times-Bold'),
        ('LINEABOVE', (0, 0), (-1, 0), 1.5, HexColor('#000000')),
        ('LINEBELOW', (0, 0), (-1, 0), 0.75, HexColor('#000000')),
        ('LINEBELOW', (0, -1), (-1, -1), 1.5, HexColor('#000000')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(KeepTogether([t, Paragraph(f'Tableau {tab_n[0]}', CAPTION)]))

def figure(path, caption, width=15*cm, height=None):
    fig_n[0] += 1
    img = Image(path, width=width, height=height)
    story.append(KeepTogether([img, Paragraph(f'Figure {fig_n[0]} — {caption}', CAPTION)]))

# ------------------------------------------------------------------ couverture
def cover(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(ACCENT)
    canvas.circle(w - 3*cm, h - 3*cm, 1.4*cm, fill=1, stroke=0)
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(2)
    canvas.line(3*cm, h - 4.2*cm, w - 3*cm, h - 4.2*cm)
    canvas.setFillColor(DARK)
    canvas.setFont('Times-Bold', 26)
    canvas.drawString(3*cm, h - 6.5*cm, 'Issue Tracker')
    canvas.setFont('Times-Roman', 16)
    canvas.setFillColor(GRAY)
    canvas.drawString(3*cm, h - 7.4*cm, 'Documentation technique complète')
    canvas.setFont('Times-Roman', 12)
    canvas.drawString(3*cm, h - 8.6*cm, 'Backend Spring Boot · Frontend React · Sécurité JWT · Serveur MCP')
    canvas.setFont('Times-Roman', 11)
    canvas.drawString(3*cm, 4*cm, 'Projet de stage — Mohamed')
    canvas.drawString(3*cm, 3.4*cm, 'Mentors : Achraf & Soheib')
    canvas.drawString(3*cm, 2.8*cm, 'Août 2026')
    canvas.setStrokeColor(HexColor('#dddddd'))
    canvas.line(3*cm, 2.4*cm, w - 3*cm, 2.4*cm)
    canvas.restoreState()

def later(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFont('Times-Roman', 9)
    canvas.setFillColor(GRAY)
    canvas.drawCentredString(w / 2, h - 1.4*cm, 'Issue Tracker — Documentation technique')
    canvas.setStrokeColor(HexColor('#cccccc'))
    canvas.line(3*cm, h - 1.6*cm, w - 2.5*cm, h - 1.6*cm)
    canvas.drawCentredString(w / 2, 1.4*cm, f'Page {doc.page}')
    canvas.restoreState()

doc = BaseDocTemplate(OUT, pagesize=A4, topMargin=2.5*cm, bottomMargin=2.3*cm,
                      leftMargin=3*cm, rightMargin=2.5*cm,
                      title='Issue Tracker — Documentation technique',
                      author='Mohamed')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='main')
doc.addPageTemplates([
    PageTemplate(id='Cover', frames=[frame], onPage=cover),
    PageTemplate(id='Main', frames=[frame], onPage=later),
])
story.append(Spacer(1, 1))  # page de couverture (dessinée par onPage)
story.append(NextPageTemplate('Main'))
story.append(PageBreak())

# ============================================================ 1. VUE D'ENSEMBLE
h1('1. Vue d’ensemble du projet')
p("""Ce document décrit l’implémentation complète du projet de stage <b>Issue Tracker</b> :
une application web de gestion de tickets (dans l’esprit de Jira ou GitHub Issues), étendue
d’un <b>serveur MCP (Model Context Protocol)</b> qui expose ses fonctionnalités à des
assistants IA (Claude Desktop, Cursor) sous forme d’outils appelables en langage naturel.""")
p("""Le projet est structuré en trois modules distincts dans un même dépôt Git :""")
bullets([
    '<b>backend/</b> — API REST Spring Boot 3 (Java 21) + PostgreSQL. C’est le cœur du système : '
    'toute la logique métier et toute la sécurité y vivent.',
    '<b>frontend/</b> — SPA React 19 + TypeScript + Vite, design system Tailwind CSS / shadcn/ui. '
    'Consomme l’API REST, ne contient aucune règle métier.',
    '<b>mcp-server/</b> — serveur MCP en TypeScript (SDK officiel), couche de traduction fine '
    'entre le protocole MCP et l’API REST existante.',
])
p("""Le principe architectural directeur est la <b>centralisation des règles</b> : validation,
autorisation et transitions de statut n’existent qu’à un seul endroit — le backend. Le frontend
et le serveur MCP sont deux clients différents du même contrat REST, comme l’illustre la figure 1.""")
figure('/tmp/pdf-fig1.png', 'Architecture globale : deux clients (SPA React, serveur MCP), un seul contrat REST.')

h2('1.1 Périmètre fonctionnel')
bullets([
    'Gestion de projets (catégories SOFTWARE / SUPPORT / INTERNAL, leader par projet).',
    'Cycle de vie complet des issues : création (OPEN), passage IN_PROGRESS, clôture (DONE, terminale), '
    'priorités LOW / MEDIUM / HIGH / CRITICAL, assignation multiple.',
    'Commentaires threadés avec suppression douce (soft delete), pièces jointes (10 Mo max, '
    'vérification du type réel par les octets).',
    'Trois rôles (ADMIN, MANAGER, USER) avec autorisation fine par action.',
    'Profils utilisateurs (bio, avatar), annuaire d’équipe, administration des rôles.',
    'Pilotage de tout cela en langage naturel via un assistant IA, grâce au serveur MCP.',
])

# ============================================================ 2. STACK TECHNIQUE
h1('2. Stack technique et justification des choix')
table(
    ['Couche', 'Technologie', 'Rôle', 'Justification'],
    [
        ['Backend', 'Spring Boot 3 / Java 21', 'API REST, logique métier, sécurité',
         'Écosystème imposé par le plan de stage ; maturité, injection de dépendances, Spring Security.'],
        ['Persistance', 'Spring Data JPA (Hibernate) + PostgreSQL', 'Mapping objet-relationnel, transactions',
         'Base relationnelle adaptée aux relations riches (ManyToMany assignees, threads de commentaires).'],
        ['Sécurité', 'Spring Security + JWT (jjwt) + BCrypt', 'Authentification stateless, autorisation',
         'Stateless = pas de session serveur ; BCrypt = hachage de mots de passe salé, standard industrie.'],
        ['Frontend', 'React 19 + TypeScript strict + Vite 8', 'SPA, UI réactive',
         'Composants typés, build rapide, écosystème dominant.'],
        ['UI / styles', 'Tailwind CSS 3 + shadcn/ui (Radix) + lucide-react', 'Design system',
         'Tokens de design centralisés, primitives accessibles, cohérence visuelle de la maquette de référence.'],
        ['HTTP front', 'axios', 'Client API avec intercepteurs',
         'Intercepteurs requête/réponse = point unique pour le JWT et le rafraîchissement transparent.'],
        ['MCP server', 'TypeScript + @modelcontextprotocol/sdk + zod', 'Serveur MCP',
         'SDK officiel du protocole ; zod = schémas d’entrée validés et convertis en JSON Schema.'],
        ['Qualité', 'TypeScript strict, oxlint, JUnit (tests backend)', 'Robustesse',
         'Typage strict côté front et MCP ; tests controllers/sécurité côté backend.'],
    ],
    [2.2*cm, 4.2*cm, 4.2*cm, 5.4*cm],
)

# ============================================================ 3. BACKEND
h1('3. Backend Spring Boot')
h2('3.1 Architecture en couches')
p("""Le backend suit une architecture en couches classique et stricte. Chaque requête traverse :
<b>controller</b> (points d’entrée REST, autorisation déclarative) → <b>service</b> (logique métier,
transactions) → <b>repository</b> (accès JPA) → <b>entity</b> (modèle persistant). Les échanges avec
l’extérieur passent par des <b>DTO</b> dédiés — les entités JPA ne fuient jamais vers l’API.
Les erreurs métier sont des exceptions dédiées (<i>ResourceNotFoundException</i>, <i>IssueClosedException</i>,
<i>CommentDeletedException</i>, <i>InvalidRefreshTokenException</i>) centralisées par un
<b>GlobalExceptionHandler</b> qui produit une enveloppe uniforme :""")
code('{ "success": false, "message": "Issue is already closed and cannot change status", "data": null }')
p("""Cette enveloppe (<i>GenericType</i>) est le contrat que tous les clients consomment : le frontend
en extrait <i>message</i> pour l’afficher, et le serveur MCP le relaie tel quel à l’assistant IA.""")

h2('3.2 Modèle de données')
p("""Six entités principales, reliées comme suit :""")
bullets([
    '<b>User</b> — identifié par un <i>uuid</i> public (l’id numérique reste interne), rôle '
    'ADMIN / MANAGER / USER, bio, avatar stocké sur disque.',
    '<b>Project</b> — catégorie (SOFTWARE / SUPPORT / INTERNAL), <i>leader</i> obligatoire (ManyToOne vers User).',
    '<b>Issue</b> — appartient à un Project ; <i>creator</i> (ManyToOne), <i>assignees</i> '
    '(ManyToMany via la table de jointure <i>issue_assignees</i>), <i>closedBy</i> + <i>closedAt</i> '
    'renseignés automatiquement à la clôture.',
    '<b>Comment</b> — appartient à une Issue, auteur, auto-référence <i>parentComment</i> pour les '
    'réponses threadées, drapeau <i>deleted</i> (suppression douce : le fil reste lisible).',
    '<b>Attachment</b> — métadonnées d’un fichier joint à une Issue ; le contenu binaire vit sur '
    'disque via <i>FileStorageService</i>, jamais en base.',
    '<b>RefreshToken</b> — jetons de rafraîchissement opaques stockés en base (voir section 5).',
])

h2('3.3 Règles métier implémentées dans les services')
p("""Les services — et eux seuls — portent les règles. Les plus importantes :""")
bullets([
    '<b>Création d’issue</b> (<i>IssueService.createIssue</i>) : le statut est forcé à OPEN et le '
    'créateur est lu depuis le SecurityContext (l’utilisateur authentifié) — jamais depuis le corps '
    'de la requête. Un client ne peut donc ni falsifier son identité ni créer une issue directement DONE.',
    '<b>Clôture terminale</b> (<i>updateStatus</i>, <i>updateIssue</i>) : une issue DONE est verrouillée — '
    'toute modification ou transition ultérieure lève <i>IssueClosedException</i> (HTTP 409). La clôture '
    'horodate <i>closedAt</i> et mémorise <i>closedBy</i>.',
    '<b>Mise à jour d’issue</b> : le statut ne passe JAMAIS par PUT /issues/{id} ; seul '
    'PATCH /issues/{id}/status peut le changer (séparation des responsabilités).',
    '<b>Projet</b> : la catégorie ne change que via PATCH /projects/{id}/category, réservé à l’ADMIN.',
    '<b>Commentaires</b> : la suppression est douce — le contenu est remplacé par « [comment deleted] » '
    'mais le fil de discussion reste cohérent.',
    '<b>Fichiers</b> : 10 Mo max par pièce jointe, type réel vérifié par les octets (Apache Tika) '
    'contre une liste blanche ; avatar 3 Mo, images uniquement.',
])

h2('3.4 Surface de l’API REST')
table(
    ['Domaine', 'Endpoints principaux', 'Accès'],
    [
        ['Auth', 'POST /api/auth/register · login · refresh · logout', 'public'],
        ['Issues', 'GET/POST /api/issues · GET/PUT/DELETE /api/issues/{id} · PATCH /api/issues/{id}/status',
         'authentifié ; écriture selon rôle + créateur/assigné/leader'],
        ['Commentaires', 'POST /api/issues/{id}/comments · PUT/DELETE /api/comments/{id}',
         'authentifié ; édition = auteur ou staff'],
        ['Pièces jointes', 'POST /api/issues/{id}/attachments · GET/DELETE /api/attachments/{id}(/content)',
         'authentifié ; suppression = uploader ou staff'],
        ['Projets', 'GET/POST/PUT/DELETE /api/projects · PATCH /api/projects/{id}/category',
         'lecture : tous ; écriture : staff ; catégorie/suppression : ADMIN'],
        ['Utilisateurs', 'GET /api/users/me · PATCH /users/me · POST /users/me/avatar · '
         'GET /users/search · GET /users/{uuid}/profile · GET /api/users · PATCH /users/{uuid}/role',
         'annuaire : tous ; liste complète et rôles : ADMIN'],
    ],
    [2.6*cm, 8.2*cm, 5.2*cm],
)
p("""La liste des issues est paginée et filtrable (projet, statut, priorité, assigné) avec tri sur
quatre champs autorisés (<i>status, priority, createdAt, updatedAt</i>) — la liste blanche
<i>SORTABLE_FIELDS</i> de <i>IssueService</i> empêche l’injection de champs de tri arbitraires.""")

# ============================================================ 4. FRONTEND
h1('4. Frontend React')
h2('4.1 Stack et design system')
p("""Le frontend est une SPA React 19 / TypeScript strict / Vite 8. La couche visuelle suit une
maquette de référence imposée : <b>Tailwind CSS 3</b> pour l’utilitaire, <b>shadcn/ui</b> (primitives
Radix accessibles) pour les composants, <b>lucide-react</b> pour les icônes, <b>sonner</b> pour les
notifications toast. Les tokens de design sont centralisés en variables CSS HSL dans
<i>src/index.css</i> : primaire #E60012, rouge foncé #B0000E, fond #F7F8FA, bordures #E5E7EB —
toute l’application en dérive, ce qui garantit la cohérence visuelle.""")
h2('4.2 Structure du code')
code('''src/
├── main.tsx            # RouterProvider + <Toaster/>
├── App.tsx             # garde d’authentification, overlays globaux (form + détail d’issue)
├── routes/router.tsx   # table de routage
├── types/              # types du domaine (timestamps en ms)
├── store/AppStore.tsx  # store unique (contexte React) — voir 4.3
├── lib/
│   ├── api.ts          # tous les appels backend + mapping DTO → types UI
│   ├── permissions.ts  # gates d’UI par rôle (miroir de l’autorisation backend)
│   ├── helpers.ts      # timeAgo, formatDate, libellés, ordres de tri
│   └── issueQuery.ts   # filtre/tri côté client de la liste d’issues
├── components/         # AppShell, KanbanBoard, IssueTable, FilterBar, IssueDetail,
│   └── ui/             # IssueForm, ProjectForm, AssigneePicker, bits + primitives shadcn
├── pages/              # Auth, Dashboard, BoardPage, ProjectPage, TeamPage, Profiles, AdminUsers
└── utils/
    ├── apiClient.ts    # axios : JWT, refresh single-flight, 401 → reconnexion
    └── apiTypes.ts     # enveloppes GenericResponse / PagedResponse''')

h2('4.3 Le store applicatif (AppStore)')
p("""<i>src/store/AppStore.tsx</i> est la source de vérité unique (contexte React). Son interface
est calquée sur celle de la maquette de référence, mais chaque méthode est adossée à l’API réelle :""")
bullets([
    '<b>Amorçage de session</b> : au montage, le token persisté est validé via GET /users/me ; '
    'puis hydratation complète (projets, utilisateurs, issues — boucle de pagination de 200).',
    '<b>Chargement paresseux du détail</b> : commentaires et pièces jointes ne sont chargés '
    '(GET /issues/{id}) qu’à l’ouverture d’une issue.',
    '<b>Mises à jour optimistes avec rollback</b> : le changement de statut '
    '(PATCH /issues/{id}/status) et le changement de rôle (PATCH /users/{uuid}/role) sont appliqués '
    'localement d’abord ; en cas d’échec serveur, l’état antérieur est restauré et un toast d’erreur '
    's’affiche. L’UI reste instantanée sans jamais mentir durablement.',
    '<b>Échec d’authentification</b> : tout 401 survivant à la tentative de rafraîchissement '
    'déclenche la même déconnexion propre que le bouton « Sign Out » (jetons effacés, redirection /login).',
])

h2('4.4 Le client HTTP (apiClient.ts)')
p("""Toute la machinerie JWT côté client tient en un module, <i>src/utils/apiClient.ts</i> :""")
bullets([
    '<b>Intercepteur de requête</b> : injecte <i>Authorization: Bearer &lt;token&gt;</i> depuis '
    'localStorage sur chaque appel.',
    '<b>Rafraîchissement « single-flight »</b> : sur 401, un seul POST /auth/refresh est émis ; '
    'toutes les requêtes concurrentes attendent la même promesse — crucial car le refresh token est '
    '<b>à usage unique</b> côté serveur (deux rafraîchissements parallèles avec le même jeton '
    'feraient rejeter le second).',
    '<b>Retry transparent</b> : la requête d’origine est rejouée avec le nouveau token ; '
    'l’utilisateur ne voit rien.',
    '<b>Discrimination des 401</b> : les 401 de /auth/login (mauvais identifiants) et /auth/refresh '
    '(jeton mort) ne déclenchent PAS la déconnexion globale — ce sont des résultats normaux de '
    'formulaire, gérés localement.',
    '<b>getErrorMessage</b> : extrait le <i>message</i> de l’enveloppe d’erreur du backend pour '
    'l’afficher tel quel dans l’UI.',
])

h2('4.5 Routage et rétro-compatibilité')
table(
    ['Chemin', 'Page', 'Note'],
    [
        ['/login · /register', 'Auth', 'redirige vers /dashboard si déjà connecté'],
        ['/dashboard', 'Dashboard', '/ redirige ici (ancien signet)'],
        ['/board', 'Issue Board', 'vues kanban + table'],
        ['/projects/:projectId', 'ProjectPage', 'chemin historique préservé'],
        ['/team', 'TeamPage', '/users/search redirige ici'],
        ['/profile', 'MyProfilePage', '/profile/edit redirige ici'],
        ['/users/:uuid', 'UserProfilePage', '/profile/:uuid redirige ici'],
        ['/admin/users', 'AdminUsersPage', 'réservé ADMIN (UI + backend)'],
    ],
    [4.2*cm, 4.2*cm, 7.6*cm],
)
p("""Les <b>gates de permission</b> (<i>lib/permissions.ts</i>) masquent ou verrouillent les actions
non autorisées (jamais de bouton cassé) ; elles sont un confort d’UI — l’autorité reste le backend.""")

# ============================================================ 5. SÉCURITÉ JWT
h1('5. Sécurité : JWT et autorisation')
h2('5.1 Le flux d’authentification complet')
p("""L’authentification est <b>stateless</b> : aucune session serveur. Le flux, de bout en bout :""")
figure('/tmp/pdf-fig2.png', 'Flux JWT : connexion, appel authentifié, rafraîchissement transparent.')
bullets([
    '<b>Connexion</b> (POST /api/auth/login) : <i>AuthenticationManager</i> vérifie le mot de passe '
    'via <b>BCrypt</b> (hachage salé — la base ne stocke jamais de mot de passe en clair). En succès, '
    '<i>JwtService</i> signe un <b>access token</b> (HMAC-SHA256, clé secrète fournie par la variable '
    'd’environnement JWT_SECRET — sans valeur par défaut : l’application refuse de démarrer sans elle) '
    'et <i>RefreshTokenService</i> émet un <b>refresh token opaque</b> aléatoire, persisté en base.',
    '<b>Appel authentifié</b> : <i>JwtAuthenticationFilter</i> intercepte chaque requête, valide la '
    'signature et l’expiration du JWT, charge l’utilisateur et peuple le <b>SecurityContext</b>. '
    'C’est de ce contexte — jamais de la requête — que les services tirent l’identité de l’appelant.',
    '<b>Rafraîchissement</b> (POST /api/auth/refresh) : le refresh token est <b>à usage unique</b> '
    '(<i>verifyAndConsume</i>) : chaque rotation invalide le précédent — un jeton volé et rejoué est '
    'détecté et rejeté. La déconnexion (POST /auth/logout) révoque le jeton côté serveur.',
    '<b>Autorisation</b> : <i>SecurityConfig</i> rend /api/auth/** public et exige l’authentification '
    'sur tout le reste de /api/** ; au-delà, <b>@EnableMethodSecurity</b> active des gardes fines '
    '@PreAuthorize sur chaque endpoint sensible.',
])

h2('5.2 La matrice d’autorisation')
p("""Trois beans dédiés (<i>IssueSecurity</i>, <i>CommentSecurity</i>, <i>AttachmentSecurity</i>)
expriment les règles contextuelles (créateur, assigné, leader de projet) ; les règles de rôle pur
sont déclarées inline :""")
table(
    ['Action', 'Règle exacte (backend)'],
    [
        ['Créer une issue', 'tout utilisateur authentifié'],
        ['Commenter / changer le statut', 'ADMIN, MANAGER, ou créateur/assigné de l’issue'],
        ['Éditer les champs / réassigner / attacher', 'les mêmes + le leader du projet'],
        ['Supprimer une issue', 'ADMIN ou MANAGER'],
        ['Créer / éditer un projet', 'ADMIN ou MANAGER'],
        ['Supprimer un projet / changer sa catégorie', 'ADMIN uniquement'],
        ['Lister tous les utilisateurs / changer un rôle', 'ADMIN uniquement'],
        ['Supprimer un commentaire / une pièce jointe', 'auteur (ou uploader) ou staff'],
    ],
    [6.4*cm, 9.6*cm],
)
p("""Point clé pour la suite : ces règles s’appliquent à <b>tout appelant HTTP</b> — navigateur du
frontend, script curl, ou serveur MCP. Aucun client ne peut les contourner sans contourner l’API
elle-même.""")

# ============================================================ 6. MCP
h1('6. Le serveur MCP (partie centrale)')
h2('6.1 Qu’est-ce que MCP, concrètement ?')
p("""Le <b>Model Context Protocol</b> est un protocole ouvert (JSON-RPC 2.0) qui standardise la
conversation entre un <b>client IA</b> (Claude Desktop, Cursor…) et un <b>serveur</b> que l’on écrit.
Le serveur expose trois primitives : les <b>tools</b> (actions que le modèle décide d’appeler),
les <b>resources</b> (données en lecture) et les <b>prompts</b> (modèles de conversation). Ce projet
n’utilise que des tools — chacun correspond à une opération métier de l’Issue Tracker.""")
p("""Le cycle de vie, tel qu’implémenté et vérifié : au démarrage, le client lance le serveur et
appelle <i>initialize</i> puis <i>tools/list</i> — le serveur répond avec les noms, descriptions et
schémas JSON de ses outils, que le modèle garde en contexte. Quand l’utilisateur formule une demande
(« crée une issue dans le projet Mobile App »), le modèle choisit un outil, remplit les arguments,
et le client émet <i>tools/call</i> ; le serveur exécute et renvoie le résultat — ou l’erreur.""")
figure('/tmp/pdf-fig3.png', 'Cycle de vie d’un appel MCP : découverte puis exécution.')
p("""Deux transports existent : <b>stdio</b> (le client lance le serveur en sous-processus et parle
sur stdin/stdout — aucun port réseau, aucune couche d’authentification à inventer) et
<b>Streamable HTTP</b> (serveur réseau, pour du multi-utilisateurs distant). Le projet utilise stdio :
c’est le mode standard des serveurs MCP personnels, et le code des outils est indifférent au transport.""")

h2('6.2 Décision d’architecture : pourquoi une couche fine au-dessus de l’API')
table(
    ['Option', 'Principe', 'Verdict'],
    [
        ['A — MCP dans l’app Spring Boot', 'le serveur MCP vit dans la même JVM et appelle les services en direct',
         'rejetée : couplage fort, et le SecurityContext (identité de l’appelant) n’existe pas hors d’une requête HTTP — '
         'il aurait fallu le bricoler, au risque de court-circuiter @PreAuthorize'],
        ['B — MCP séparé appelant l’API REST', 'processus indépendant, client HTTP authentifié par JWT',
         'RETENUE : zéro duplication de logique, autorisation backend intacte, identité naturelle via JWT, '
         'cycle de vie indépendant'],
        ['C — module Java partageant les services', 'deux artefacts, code métier partagé',
         'rejetée : réintroduit le couplage et le problème du SecurityContext'],
    ],
    [3.6*cm, 5.6*cm, 6.8*cm],
)
p("""L’option B fait de l’API REST le <b>contrat unique</b>. Le serveur MCP ne contient aucune règle :
il déclare des outils avec des schémas stricts, appelle l’API, et traduit fidèlement réponses et clients
erreurs. Les @PreAuthorize, les validations de DTO et les règles de transition continuent de s’appliquer
— gratuitement.""")

h2('6.3 Implémentation : structure et code')
p("""Le module <i>mcp-server/</i> tient en deux fichiers source :""")
code('''mcp-server/
├── src/
│   ├── api.ts      # client HTTP : config env, cycle de vie JWT, erreurs
│   └── index.ts    # serveur MCP : déclaration des 8 outils
├── test-e2e.mjs    # test de bout en bout (pilote le serveur en stdio)
├── README.md       # installation + configuration Claude Desktop / Cursor
└── *.example.json  # configurations d’exemple pour les deux clients''')

h3('6.3.1 api.ts — le client API et le cycle de vie du JWT')
p("""Le serveur s’authentifie comme un <b>compte de service</b> dédié (utilisateur réel en base,
ici <i>claude.bot</i>, rôle MANAGER). Trois variables d’environnement le configurent :
<i>ISSUE_TRACKER_API_URL</i>, <i>ISSUE_TRACKER_USERNAME</i>, <i>ISSUE_TRACKER_PASSWORD</i>.
Le module gère le cycle de vie du JWT de façon autonome :""")
bullets([
    '<b>Login paresseux</b> : la première requête déclenche POST /auth/login ; les jetons sont '
    'gardés en mémoire de processus.',
    '<b>401 → refresh → retry</b> : sur un 401, le serveur tente POST /auth/refresh (rotation à '
    'usage unique gérée côté serveur), retombe sur un login complet si le refresh a expiré, puis '
    'rejoue la requête une seule fois.',
    '<b>ApiError</b> : toute erreur HTTP devient une exception typée portant le statut et le '
    '<i>message</i> du backend — la matière première du relayage d’erreurs (6.4).',
])
code('''if (res.status === 401 && !isRetry) {
  await refresh()                       // POST /auth/refresh, sinon login()
  return apiFetch<T>(method, path, body, true)   // un seul retry
}
if (!res.ok) throw new ApiError(res.status, json.message ?? `HTTP ${res.status}`)''')

h3('6.3.2 index.ts — anatomie d’un outil')
p("""Chaque outil est déclaré via <i>server.registerTool</i> avec quatre morceaux : un <b>nom</b>,
une <b>description</b> en langage naturel (le texte que le modèle lit pour décider quand et comment
appeler l’outil — c’est l’interface avec l’IA), un <b>inputSchema</b> en zod (converti en JSON Schema
et validé avant tout appel du handler), et le <b>handler</b> qui appelle l’API. Exemple réel :""")
code('''server.registerTool('update_issue_status', {
  title: 'Update issue status',
  description:
    'Change the status of an issue. Valid statuses: OPEN, IN_PROGRESS, DONE. ' +
    'DONE is terminal: a DONE issue is locked and cannot be edited or reopened. ' +
    'The backend enforces who is allowed to change status and rejects invalid transitions.',
  inputSchema: {
    issueId: z.number().int().describe('Numeric id of the issue'),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE']).describe('New status'),
  },
}, async ({ issueId, status }) =>
  run(() => apiFetch('PATCH', `/issues/${issueId}/status`, { status })))''')
p("""Notez que la description <b>enseigne la règle métier au modèle</b> (« DONE is terminal ») :
l’IA est prévenue avant d’agir, et le backend reste le juge si elle essaie quand même.""")

h2('6.4 Les huit outils exposés')
table(
    ['Outil', 'Rôle', 'Endpoint backend'],
    [
        ['list_projects', 'liste les projets (trouver le projectId)', 'GET /api/projects'],
        ['search_issues', 'filtre les issues (projet, statut, priorité, assigné, pagination)', 'GET /api/issues'],
        ['get_issue', 'détail complet : commentaires threadés + pièces jointes', 'GET /api/issues/{id}'],
        ['search_users', 'résout une personne en uuid (trouver les assignedUuids)', 'GET /api/users/search'],
        ['create_issue', 'crée une issue (statut OPEN imposé par le backend)', 'POST /api/issues'],
        ['update_issue_status', 'OPEN / IN_PROGRESS / DONE (DONE terminale)', 'PATCH /api/issues/{id}/status'],
        ['assign_issue', 'remplace les assignés (fusion avec l’état courant, PUT)', 'PUT /api/issues/{id}'],
        ['add_comment', 'commente, réponses threadées possibles', 'POST /api/issues/{id}/comments'],
    ],
    [3.4*cm, 7.2*cm, 5.4*cm],
)
p("""<b>Gestion des erreurs.</b> Toute erreur backend (403 interdit, 404 introuvable, 409 issue
verrouillée, 400 validation) est renvoyée au client IA comme <b>erreur d’outil</b> (drapeau
<i>isError</i> du protocole) avec le message exact du backend. L’assistant peut alors expliquer le
refus à l’utilisateur au lieu d’échouer silencieusement — c’est ce qui rend les appels « fiables »
au sens des critères d’évaluation.""")
p("""<b>Anti-hallucination.</b> Les outils de lecture existent <i>avant</i> les outils d’écriture
par design : les descriptions de create_issue et assign_issue ordonnent littéralement au modèle
d’appeler list_projects / search_users d’abord (« never guess a project id »). Les identifiants
inventés qui passeraient quand même sont rejetés par le backend (404) et relayés.""")

h2('6.5 Sécurité du dispositif MCP')
bullets([
    '<b>Le compte de service est le plafond des pouvoirs de l’IA.</b> claude.bot est MANAGER : '
    'l’assistant peut gérer projets et issues, mais ne pourra jamais changer un rôle ni supprimer '
    'un projet (règles ADMIN) — le backend répondrait 403, relayé comme erreur.',
    '<b>Aucune règle n’est dupliquée.</b> La sécurité effective reste à 100 % dans le backend ; '
    'le MCP n’ajoute que des garde-fous d’entrée (schémas zod) et de bonnes descriptions.',
    '<b>Traçabilité.</b> Chaque action de l’IA est attribuée à une identité réelle (créateur, '
    'closedBy, auteur des commentaires = claude.bot), visible dans l’UI et les données.',
    '<b>stdio = pas de surface réseau.</b> Le serveur n’écoute aucun port ; seul le client qui '
    'l’a lancé peut lui parler.',
])

h2('6.6 Configuration des clients et vérification')
p("""Claude Desktop lit <i>claude_desktop_config.json</i>, Cursor lit <i>~/.cursor/mcp.json</i> ;
les deux déclarent comment lancer le serveur et injectent les variables d’environnement :""")
code('''{
  "mcpServers": {
    "issue-tracker": {
      "command": "node",
      "args": [".../mcp-server/dist/index.js"],
      "env": {
        "ISSUE_TRACKER_API_URL": "http://localhost:8080/api",
        "ISSUE_TRACKER_USERNAME": "claude.bot",
        "ISSUE_TRACKER_PASSWORD": "..."
      }
    }
  }
}''')
p("""La vérification a été faite de bout en bout par un test stdio (<i>test-e2e.mjs</i>) qui pilote
le serveur exactement comme un client MCP : handshake, découverte, puis appel de chaque outil contre
le backend réel. Résultat : <b>12/12 contrôles réussis</b>, y compris les deux contrôles de règles
métier — la réouverture d’une issue DONE est bien rejetée (« Backend error 409: Issue is already
closed ») et un projectId inconnu renvoie 404, tous deux relayés comme erreurs d’outil.""")

# ============================================================ 7. DÉMARRAGE
h1('7. Lancer l’ensemble du système')
code('''# 1. Base de données (PostgreSQL sur localhost:5432)
CREATE DATABASE issuetracker;

# 2. Backend (terminal 1) — JWT_SECRET est obligatoire
export JWT_SECRET=$(openssl rand -base64 32)
cd backend && ./mvnw spring-boot:run          # http://localhost:8080

# 3. Frontend (terminal 2)
cd frontend && npm install && npm run dev     # http://localhost:5173 (proxy /api)

# 4. Serveur MCP (lancé automatiquement par le client IA)
cd mcp-server && npm install && npm run build
#    puis déclarer dist/index.js + les variables d'env dans Claude Desktop / Cursor''')

# ============================================================ 8. ÉVOLUTIONS
h1('8. Limites connues et évolutions')
bullets([
    '<b>Transport HTTP</b> : pour un usage multi-utilisateurs ou distant, le même code d’outils '
    'peut être servi via Streamable HTTP (avec une couche d’authentification MCP dédiée).',
    '<b>Backend déployé</b> : pointer ISSUE_TRACKER_API_URL vers l’URL de production suffit — '
    'le backend possède déjà un profil prod.',
    '<b>Resources et prompts MCP</b> : non utilisés aujourd’hui ; des resources en lecture seule '
    '(ex. « l’issue ouverte ») seraient un ajout naturel.',
    '<b>Outillage d’écriture supplémentaire</b> : édition d’issue complète, gestion de projets — '
    'le même patron d’outil s’applique.',
])

doc.build(story)
print('PDF généré :', OUT)
