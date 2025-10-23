export interface ToolGuide {
	id: string;
	name: string;
	description: string;
	officialSite: string;
	prerequisites?: string[];
	steps: {
		title: string;
		description?: string;
		content: string;
		codeBlock?: {
			language: string;
			code: string;
		};
		note?: string;
	}[];
	troubleshooting?: {
		issue: string;
		solution: string;
	}[];
	nextSteps?: string[];
}

export const toolsData: Record<string, ToolGuide> = {
	"claude-code": {
		id: "claude-code",
		name: "Claude Code",
		description: "AI-powered coding assistant that helps you write, understand, and debug code with natural language interactions.",
		officialSite: "https://claude.ai/code",
		prerequisites: [
			"macOS 13.0+ or Windows 10+ or Linux",
			"An Anthropic account (free tier available)",
			"Basic familiarity with command line/terminal",
		],
		steps: [
			{
				title: "Create an Anthropic Account",
				content: "Visit claude.ai and sign up for a free account. You can use your email or sign in with Google/Apple.",
			},
			{
				title: "Download Claude Code",
				content: "Go to the Claude Code download page and download the installer for your operating system (macOS, Windows, or Linux).",
			},
			{
				title: "Install Claude Code",
				description: "Run the installer and follow the setup wizard",
				content: "For macOS: Open the .dmg file and drag Claude Code to Applications. For Windows: Run the .exe installer. For Linux: Follow the distribution-specific installation instructions.",
			},
			{
				title: "Sign In and Authorize",
				content: "Launch Claude Code and sign in with your Anthropic account. Grant the necessary permissions when prompted.",
			},
			{
				title: "Verify Installation",
				content: "Open your terminal and run the following command to verify Claude Code CLI is installed:",
				codeBlock: {
					language: "bash",
					code: "claude --version",
				},
			},
			{
				title: "Configure Your First Project",
				content: "Navigate to a project directory and initialize Claude Code. This will create configuration files for context management.",
				codeBlock: {
					language: "bash",
					code: "cd your-project\nclaude init",
				},
				note: "We'll explore context engineering patterns during the workshop!",
			},
		],
		troubleshooting: [
			{
				issue: "Command not found: claude",
				solution: "Add Claude Code to your PATH. On macOS/Linux, add this to your ~/.bashrc or ~/.zshrc: export PATH=\"$PATH:/Applications/Claude Code.app/Contents/Resources/app/bin\"",
			},
			{
				issue: "Authentication failed",
				solution: "Sign out and sign back in. Make sure you're using the same account you registered with at claude.ai",
			},
		],
		nextSteps: [
			"Familiarize yourself with the Claude Code interface",
			"Try asking Claude to explain a piece of code in one of your projects",
			"Explore the documentation at docs.claude.ai",
		],
	},
	"warp-ai": {
		id: "warp-ai",
		name: "Warp AI",
		description: "Modern terminal with AI command suggestions, intelligent completions, and collaborative features.",
		officialSite: "https://www.warp.dev",
		prerequisites: [
			"macOS 10.15+ or Linux",
			"An email address for account creation",
		],
		steps: [
			{
				title: "Download Warp",
				content: "Visit warp.dev and click the download button. Warp is currently available for macOS and Linux.",
			},
			{
				title: "Install Warp",
				content: "For macOS: Open the downloaded .dmg file and drag Warp to your Applications folder. For Linux: Follow the installation instructions for your distribution.",
			},
			{
				title: "Create Your Account",
				content: "Launch Warp and create an account using your email or sign in with GitHub, Google, or other providers.",
			},
			{
				title: "Complete the Onboarding",
				content: "Warp will guide you through a quick tutorial. Take a few minutes to learn the keyboard shortcuts and AI features.",
			},
			{
				title: "Enable Warp AI",
				content: "Press Ctrl+` (backtick) or Cmd+` to open the AI command search. This is where you can describe commands in natural language.",
			},
			{
				title: "Customize Your Settings",
				content: "Click the settings icon (gear) in the bottom right. Configure your preferred theme, shell (bash, zsh, fish), and AI features.",
				note: "Enable 'AI Command Suggestions' for the best experience during the workshop.",
			},
		],
		troubleshooting: [
			{
				issue: "Warp won't open on macOS",
				solution: "Right-click the Warp app and select 'Open' to bypass Gatekeeper. You may need to go to System Preferences > Security & Privacy to allow it.",
			},
			{
				issue: "AI features not working",
				solution: "Check your internet connection and make sure you're signed in. Go to Settings > AI and verify AI features are enabled.",
			},
		],
		nextSteps: [
			"Practice using Ctrl/Cmd+` to search for commands",
			"Try asking Warp AI to explain complex command outputs",
			"Set Warp as your default terminal",
		],
	},
	"docker": {
		id: "docker",
		name: "Docker",
		description: "Containerization platform for building, shipping, and running applications in isolated environments.",
		officialSite: "https://www.docker.com",
		prerequisites: [
			"macOS 11+, Windows 10/11 (Pro/Enterprise) with WSL2, or Linux",
			"At least 4GB RAM available",
			"Administrator/sudo access",
		],
		steps: [
			{
				title: "Download Docker Desktop",
				content: "Visit docker.com/products/docker-desktop and download the installer for your operating system.",
			},
			{
				title: "Install Docker Desktop",
				description: "Follow OS-specific installation steps",
				content: "For macOS: Open the .dmg and drag Docker to Applications. For Windows: Run the installer and enable WSL2 when prompted. For Linux: Use the official Docker Engine installation for your distribution.",
			},
			{
				title: "Start Docker Desktop",
				content: "Launch Docker Desktop from your Applications folder (macOS) or Start Menu (Windows). Wait for Docker to start - you'll see the whale icon in your menu bar/system tray.",
			},
			{
				title: "Verify Installation",
				content: "Open your terminal and run these commands to verify Docker is working:",
				codeBlock: {
					language: "bash",
					code: "docker --version\ndocker run hello-world",
				},
				note: "The hello-world container should download and run successfully.",
			},
			{
				title: "Sign Up for Docker Hub (Optional)",
				content: "Create a free account at hub.docker.com. This allows you to pull public images and push your own containers.",
			},
		],
		troubleshooting: [
			{
				issue: "Docker daemon not running",
				solution: "Make sure Docker Desktop is running. Check the system tray/menu bar for the Docker icon. If it's not there, launch Docker Desktop again.",
			},
			{
				issue: "WSL2 errors on Windows",
				solution: "Run 'wsl --update' in PowerShell as Administrator. Make sure virtualization is enabled in your BIOS.",
			},
			{
				issue: "Permission denied errors on Linux",
				solution: "Add your user to the docker group: sudo usermod -aG docker $USER, then log out and back in.",
			},
		],
		nextSteps: [
			"Try running a few sample containers to test Docker",
			"Review basic Docker commands (docker run, docker ps, docker images)",
			"Learn about Docker Compose for multi-container applications",
		],
	},
	"serena-mcp": {
		id: "serena-mcp",
		name: "Serena MCP",
		description: "Model Context Protocol server for enhanced AI context management and tool integration.",
		officialSite: "https://github.com/supermemoryai/serena-mcp",
		prerequisites: [
			"Node.js 18+ installed",
			"npm or bun package manager",
			"Claude Code or compatible MCP client installed",
		],
		steps: [
			{
				title: "Verify Node.js Installation",
				content: "Check that you have Node.js 18 or higher installed:",
				codeBlock: {
					language: "bash",
					code: "node --version",
				},
				note: "If not installed, download from nodejs.org",
			},
			{
				title: "Install Serena MCP",
				content: "Install Serena MCP globally using npm or your preferred package manager:",
				codeBlock: {
					language: "bash",
					code: "npm install -g @supermemory/serena-mcp",
				},
			},
			{
				title: "Configure MCP in Claude Code",
				content: "Add Serena MCP to your Claude Code MCP configuration. Create or edit ~/.config/claude-code/mcp.json:",
				codeBlock: {
					language: "json",
					code: `{
  "mcpServers": {
    "serena": {
      "command": "npx",
      "args": ["-y", "@supermemory/serena-mcp"]
    }
  }
}`,
				},
			},
			{
				title: "Set Up API Keys",
				content: "Serena MCP requires API keys for memory features. Create a .env file in your project root:",
				codeBlock: {
					language: "bash",
					code: "SUPERMEMORY_API_KEY=your_api_key_here",
				},
				note: "We'll provide API keys during the workshop, or you can sign up at supermemory.ai",
			},
			{
				title: "Restart Claude Code",
				content: "Restart Claude Code to load the new MCP server configuration. You should see Serena MCP available in the MCP panel.",
			},
			{
				title: "Test the Connection",
				content: "In Claude Code, try asking Claude to use the memory features. For example: 'Remember that I prefer TypeScript for new projects.'",
			},
		],
		troubleshooting: [
			{
				issue: "MCP server not showing up",
				solution: "Check the MCP logs in Claude Code settings. Verify your mcp.json syntax is correct and the path is accurate.",
			},
			{
				issue: "Authentication errors",
				solution: "Make sure your SUPERMEMORY_API_KEY is set correctly. Check that the .env file is in the right location.",
			},
		],
		nextSteps: [
			"Explore the Serena MCP documentation",
			"Experiment with storing and retrieving context",
			"Learn about different memory types (short-term, long-term, project-specific)",
		],
	},
	"context7": {
		id: "context7",
		name: "Context7",
		description: "Context management tool for AI workflows, enabling better control over model inputs and outputs.",
		officialSite: "https://context7.ai",
		prerequisites: [
			"A modern web browser (Chrome, Firefox, Safari, or Edge)",
			"Email address for account creation",
		],
		steps: [
			{
				title: "Create a Context7 Account",
				content: "Visit context7.ai and sign up for a free account. You can use email or sign in with Google/GitHub.",
			},
			{
				title: "Install Browser Extension (Optional)",
				content: "For the best experience, install the Context7 browser extension from the Chrome Web Store or Firefox Add-ons.",
			},
			{
				title: "Create Your First Project",
				content: "Once logged in, create a new project. Give it a name related to our workshop, like 'AI Context Engineering Workshop'.",
			},
			{
				title: "Configure Context Templates",
				content: "Set up context templates for common tasks. We'll dive deeper into this during the workshop, but create at least one template to get familiar with the interface.",
			},
			{
				title: "Connect to Your AI Tools",
				content: "Context7 can integrate with various AI tools. Link it to your Claude Code or other AI assistants by following the integration guide in the settings.",
			},
			{
				title: "Test Context Management",
				content: "Create a sample context document and try using it in a conversation with an AI assistant. Notice how it affects the responses.",
			},
		],
		troubleshooting: [
			{
				issue: "Can't connect to AI tools",
				solution: "Check that you've authorized Context7 to access your AI assistants. Review the integration permissions in both platforms.",
			},
			{
				issue: "Templates not saving",
				solution: "Clear your browser cache and cookies for context7.ai. Try using a different browser to isolate the issue.",
			},
		],
		nextSteps: [
			"Watch the Context7 getting started video",
			"Create context templates for different types of tasks",
			"Experiment with context chaining and composition",
		],
	},
	"github": {
		id: "github",
		name: "GitHub",
		description: "Version control and collaboration platform for managing code repositories and project workflows.",
		officialSite: "https://github.com",
		prerequisites: [
			"An email address",
			"Basic understanding of version control (helpful but not required)",
		],
		steps: [
			{
				title: "Sign Up for GitHub",
				content: "Visit github.com and click 'Sign up'. Choose a username, provide your email, and create a password.",
			},
			{
				title: "Verify Your Email",
				content: "Check your email inbox for a verification email from GitHub. Click the verification link to activate your account.",
			},
			{
				title: "Set Up Your Profile",
				content: "Add a profile picture and bio. This helps others recognize you in collaborative projects.",
			},
			{
				title: "Install Git Locally",
				content: "Download and install Git from git-scm.com if you haven't already:",
				codeBlock: {
					language: "bash",
					code: "git --version",
				},
				note: "If Git is not installed, visit git-scm.com/downloads",
			},
			{
				title: "Configure Git with Your GitHub Account",
				content: "Set up your Git identity to match your GitHub account:",
				codeBlock: {
					language: "bash",
					code: `git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"`,
				},
			},
			{
				title: "Set Up SSH Keys (Recommended)",
				content: "Generate an SSH key for secure authentication with GitHub:",
				codeBlock: {
					language: "bash",
					code: `ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub`,
				},
				note: "Copy the output and add it to GitHub Settings > SSH and GPG keys > New SSH key",
			},
			{
				title: "Test Your Connection",
				content: "Verify your SSH connection to GitHub:",
				codeBlock: {
					language: "bash",
					code: "ssh -T git@github.com",
				},
				note: "You should see a success message with your username.",
			},
		],
		troubleshooting: [
			{
				issue: "SSH key not recognized",
				solution: "Make sure you copied the entire public key (including ssh-ed25519 and your email). Add it to GitHub Settings > SSH and GPG keys.",
			},
			{
				issue: "Permission denied (publickey)",
				solution: "Run ssh-add ~/.ssh/id_ed25519 to add your key to the SSH agent. On macOS, you may need to add it to your keychain.",
			},
		],
		nextSteps: [
			"Create a test repository on GitHub",
			"Clone the repository locally using git clone",
			"Practice making commits and pushing changes",
			"Explore GitHub's collaboration features (issues, pull requests)",
		],
	},
	"better-t-stack": {
		id: "better-t-stack",
		name: "Better T-Stack",
		description: "Modern full-stack development template with TypeScript, optimized for rapid AI-assisted development.",
		officialSite: "https://better-stack.dev",
		prerequisites: [
			"Node.js 18+ or Bun installed",
			"Git installed and configured",
			"GitHub account (for cloning repositories)",
			"Basic familiarity with React and TypeScript",
		],
		steps: [
			{
				title: "Verify Prerequisites",
				content: "Make sure you have Node.js (or Bun) and Git installed:",
				codeBlock: {
					language: "bash",
					code: "node --version\ngit --version",
				},
			},
			{
				title: "Clone the Better T-Stack Template",
				content: "Clone the template repository to your local machine:",
				codeBlock: {
					language: "bash",
					code: `git clone https://github.com/better-stack/better-t-stack.git my-workshop-project
cd my-workshop-project`,
				},
				note: "Replace 'my-workshop-project' with your preferred project name",
			},
			{
				title: "Install Dependencies",
				content: "Install the project dependencies using your preferred package manager:",
				codeBlock: {
					language: "bash",
					code: "npm install\n# or\nbun install",
				},
			},
			{
				title: "Set Up Environment Variables",
				content: "Copy the example environment file and configure your local settings:",
				codeBlock: {
					language: "bash",
					code: "cp .env.example .env.local",
				},
				note: "We'll configure specific API keys during the workshop",
			},
			{
				title: "Start the Development Server",
				content: "Run the development server to make sure everything is working:",
				codeBlock: {
					language: "bash",
					code: "npm run dev\n# or\nbun dev",
				},
				note: "The app should open at http://localhost:3000",
			},
			{
				title: "Explore the Project Structure",
				content: "Familiarize yourself with the folder structure. Key directories include /app (Next.js app router), /components (React components), and /lib (utilities and configurations).",
			},
		],
		troubleshooting: [
			{
				issue: "Port 3000 already in use",
				solution: "Either stop the process using port 3000, or run the dev server on a different port: npm run dev -- -p 3001",
			},
			{
				issue: "Module not found errors",
				solution: "Delete node_modules and package-lock.json (or bun.lockb), then run npm install (or bun install) again.",
			},
			{
				issue: "TypeScript errors",
				solution: "Make sure you're using a compatible Node version (18+). Run npm run type-check to see detailed TypeScript errors.",
			},
		],
		nextSteps: [
			"Review the stack documentation at better-stack.dev",
			"Explore the example components and pages",
			"Try making a simple change and see it hot-reload",
			"Read through the README.md for additional features",
		],
	},
};
