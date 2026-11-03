# Global Legal Consulting

Site vitrine statique de Global Legal Consulting.

## Déploiement Hostinger

Le dépôt contient les sources HTML, CSS, JavaScript et images. Hostinger doit utiliser la branche `main`, la commande de compilation `npm run build` et le dossier de sortie `dist` (Node.js 18 ou supérieur, framework `Other`). Le fichier d'entrée reste vide pour ce site statique.

Le dossier `dist/` est généré par le build et ignoré par Git. Le script copie toutes les pages HTML et les assets dans `dist/` en conservant leurs chemins relatifs. Pour un transfert manuel par FTP, exécute `npm run build`, puis téléverse le contenu de `dist/` directement dans `public_html/`.
