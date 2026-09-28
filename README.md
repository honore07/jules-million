# Jules Million MVP - Perplexity Integration

MVP application intégrant l'API Perplexity pour les requêtes alimentées par recherche en temps réel.

## 🚀 Configuration Rapide

### 1. Cloner et Installer

```bash
git clone <repo-url>
cd jules-million
npm install
```

### 2. Configurer les Variables d'Environnement

#### Option A: Fichier `.env.local` (Recommandé pour le développement)

```bash
cp .env.example .env.local
```

Puis éditez `.env.local` et remplissez votre clé API:

```env
PERPLEXITY_API_KEY=votre_clé_api_ici
PERPLEXITY_MODEL=pplx-7b-online
NODE_ENV=development
PORT=3000
```

#### Option B: Variables d'Environnement Système

```bash
export PERPLEXITY_API_KEY="votre_clé_api_ici"
npm run dev
```

#### Option C: Fichier `.env` (Production)

```bash
cp .env.example .env
# Éditez .env avec votre clé API
```

### 3. Lancer l'Application

#### Développement
```bash
npm run dev
```

#### Production
```bash
npm run build
npm start
```

## 📋 Variables d'Environnement

| Variable | Description | Défaut | Requis |
|----------|-------------|--------|---------|
| `PERPLEXITY_API_KEY` | Votre clé API Perplexity | N/A | ✅ Oui |
| `PERPLEXITY_API_BASE_URL` | URL de l'endpoint API | `https://api.perplexity.ai/chat/completions` | Non |
| `PERPLEXITY_MODEL` | Modèle Perplexity à utiliser | `pplx-7b-online` | Non |
| `NODE_ENV` | Environnement (development/production) | `development` | Non |
| `PORT` | Port du serveur | `3000` | Non |

## 🔑 Modèles Disponibles

- `pplx-7b-online` - Petit modèle rapide avec recherche
- `pplx-70b-online` - Grand modèle avec recherche
- `pplx-7b` - Petit modèle sans recherche
- `pplx-70b` - Grand modèle sans recherche

## 📡 API Endpoints

### GET `/`
Vérifie l'état du serveur

```bash
curl http://localhost:3000/
```

### POST `/api/query`
Envoie une requête à Perplexity

```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Quel est le meilleur framework TypeScript en 2024?"
  }'
```

**Response:**
```json
{
  "prompt": "Quel est le meilleur framework TypeScript en 2024?",
  "response": "...",
  "model": "pplx-7b-online"
}
```

## 🔐 Sécurité

- **Ne jamais** committer `.env.local` ou `.env` dans git
- `.env.example` contient uniquement des variables de placeholder
- Les clés API sont chargées depuis les variables d'environnement
- Utilisez un gestionnaire de secrets en production (AWS Secrets Manager, GitHub Secrets, etc.)

## 📚 Structure du Projet

```
.
├── src/
│   ├── index.ts           # Point d'entrée Express
│   ├── config.ts          # Configuration (variables d'env)
│   └── perplexity.ts      # Client Perplexity
├── .env.example           # Template des variables
├── .env.local             # Variables locales (git-ignored)
├── .gitignore             # Fichiers ignorés par git
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Scripts

```bash
npm run dev       # Développement avec hot-reload
npm run build     # Compiler TypeScript
npm start         # Lancer l'app compilée
npm run test      # Exécuter les tests
npm run lint      # Linter le code
```

## 📝 Exemple d'Utilisation

```typescript
import { perplexity } from './perplexity';

const response = await perplexity.query('Parlez-moi de l\'IA');
console.log(response);
```

## 🐛 Dépannage

### Erreur: `PERPLEXITY_API_KEY environment variable is required`
- Vérifiez que `.env.local` ou `.env` existe
- Assurez-vous que la clé API est définie correctement
- Vérifiez que Node.js trouve le fichier `.env`

### Erreur: `401 Unauthorized`
- Vérifiez que votre clé API Perplexity est valide
- Générez une nouvelle clé depuis [console.perplexity.ai](https://console.perplexity.ai)

### Erreur: `429 Too Many Requests`
- Vous avez dépassé le rate limit
- Attendez quelques secondes avant de réessayer
- Vérifiez votre plan Perplexity

## 📞 Support

Pour plus d'informations:
- [Documentation Perplexity API](https://docs.perplexity.ai/)
- [Console Perplexity](https://console.perplexity.ai/)
