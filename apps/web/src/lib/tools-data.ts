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
		image?: {
			src: string;
			alt: string;
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
		officialSite: "https://docs.claude.com/en/docs/claude-code/overview",
		prerequisites: [
			"A computer with macOS, Windows, or Linux",
			"At least 4GB of available memory (RAM)",
			"An internet connection",
			"A credit card for Anthropic account setup (required for billing, but you can stay on free tier)",
		],
		steps: [
			{
				title: "Create Your Anthropic Account",
				description: "You'll need an account with billing enabled (free tier available)",
				content: "Go to console.anthropic.com and click 'Sign Up'. You can use your email, Google, or Apple account. After signing up, you'll need to add a payment method (credit card) even if you plan to use the free tier.",
				note: "Don't worry - you won't be charged unless you exceed the free usage limits!",
			},
			{
				title: "Install Node.js (if you don't have it)",
				description: "Node.js is needed to run Claude Code",
				content: "Visit nodejs.org and download the 'LTS' (Long Term Support) version. Run the installer and follow the setup wizard. This is like installing any other program on your computer.",
				codeBlock: {
					language: "bash",
					code: "node --version",
				},
				note: "After installing, open a NEW terminal window and run this command to verify. You should see a version number like 'v18.x.x' or higher.",
			},
			{
				title: "Install Claude Code",
				description: "Use this simple command to install Claude Code globally on your computer",
				content: "Open your terminal (Mac/Linux) or Command Prompt (Windows) and paste this command:",
				codeBlock: {
					language: "bash",
					code: "npm install -g @anthropic-ai/claude-code",
				},
				note: "This will download and install Claude Code. It might take a minute or two. Don't use 'sudo' on Mac/Linux - if you get permission errors, see troubleshooting below.",
			},
			{
				title: "Windows Users: Additional Setup",
				description: "If you're on Windows, you need one of these options",
				content: "Option 1 (Recommended): Install 'Git for Windows' from git-scm.com - this includes Git Bash which Claude Code needs. Option 2: Enable WSL (Windows Subsystem for Linux) - search 'Turn Windows features on or off' in Start menu, enable WSL, restart, then install Ubuntu from Microsoft Store.",
				note: "Mac and Linux users can skip this step!",
			},
			{
				title: "Start Claude Code and Sign In",
				description: "Launch Claude Code from your terminal",
				content: "In your terminal, type 'claude' and press Enter. This will open your web browser for authentication. Sign in with the same Anthropic account you created in Step 1.",
				codeBlock: {
					language: "bash",
					code: "claude",
				},
			},
			{
				title: "Verify Everything Works",
				description: "Let's make sure Claude Code is working properly",
				content: "After signing in, Claude Code should start in your terminal. Try asking it a simple question like 'What can you help me with?' to test that everything is working.",
				note: "You can type 'exit' or press Ctrl+C to quit Claude Code when you're done.",
			},
		],
		troubleshooting: [
			{
				issue: "'claude' command not found",
				solution: "Close your terminal completely and open a NEW terminal window. The installation added Claude Code to your system PATH, but you need a fresh terminal for it to work. If it still doesn't work, try restarting your computer.",
			},
			{
				issue: "Permission errors when installing (Mac/Linux)",
				solution: "Don't use 'sudo'! Instead, fix npm permissions by running: mkdir ~/.npm-global && npm config set prefix '~/.npm-global' then add this line to your ~/.bashrc or ~/.zshrc file: export PATH=~/.npm-global/bin:$PATH - Then close and reopen your terminal and try installing again.",
			},
			{
				issue: "Authentication or billing errors",
				solution: "Make sure you've added a payment method to your Anthropic account at console.anthropic.com. Go to Settings > Billing and add a credit card. You'll still stay on the free tier until you exceed the limits.",
			},
			{
				issue: "Windows: 'npm' is not recognized",
				solution: "Node.js installation didn't complete properly. Uninstall Node.js completely, restart your computer, then reinstall from nodejs.org. Make sure to check 'Add to PATH' during installation.",
			},
		],
		nextSteps: [
			"Practice launching Claude Code by typing 'claude' in your terminal",
			"Try asking Claude to explain what it can do",
			"Don't worry if you feel lost - we'll walk through everything at the workshop!",
			"Check out the Quick Start guide at docs.claude.com/en/docs/claude-code",
		],
	},
	"warp-ai": {
		id: "warp-ai",
		name: "Warp AI",
		description: "Modern terminal with AI command suggestions, intelligent completions, and collaborative features.",
		officialSite: "https://www.warp.dev",
		prerequisites: [
			"A Mac computer with macOS 10.15 or newer (Catalina or later)",
			"OR a Linux computer (Ubuntu, Fedora, or other distributions)",
			"An email address for account creation",
			"Note: Warp is not currently available for Windows",
		],
		steps: [
			{
				title: "Download Warp",
				description: "Get the Warp installer for your operating system",
				content: "Visit warp.dev and click the big 'Download' button. The website will automatically detect if you're on Mac or Linux and give you the right version.",
				note: "Mac users will get a .dmg file. Linux users will get installation instructions for their specific distribution.",
			},
			{
				title: "Install Warp",
				description: "Install the application on your computer",
				content: "For Mac: Open the downloaded .dmg file. You'll see the Warp icon - drag it into your Applications folder (just like installing any other Mac app). For Linux: Follow the specific instructions for your distribution (usually involves running a few commands in your current terminal).",
				note: "This is just like installing any other app on your computer!",
			},
			{
				title: "Open Warp for the First Time",
				description: "Launch Warp from your Applications folder (Mac) or app menu (Linux)",
				content: "On Mac: Open your Applications folder and double-click on Warp. If you see a security warning, click 'Open' to confirm. On Linux: Search for 'Warp' in your app launcher and click it.",
			},
			{
				title: "Create Your Free Account",
				description: "Sign up to unlock Warp's AI features",
				content: "When Warp opens, you'll see a sign-up screen. You can create an account using your email, or sign in with GitHub, Google, or other services. This account is completely free and gives you access to all the AI features.",
				note: "The AI features require an account, so make sure to sign up!",
			},
			{
				title: "Complete the Quick Tutorial",
				description: "Learn the basics with Warp's interactive guide",
				content: "Warp will show you a quick tutorial when you first start. Take 2-3 minutes to go through it - it will teach you the most useful features. You can skip parts if you want, but it's really helpful!",
			},
			{
				title: "Try Warp AI",
				description: "Test out the AI-powered command search",
				content: "Press # and start typing what you want to do in plain English. For example, type '# show all files including hidden ones' and Warp AI will suggest the correct command. Press Tab to accept the suggestion!",
				codeBlock: {
					language: "bash",
					code: "# show all files including hidden ones\n# find files larger than 100MB\n# what's my IP address",
				},
				note: "The # symbol activates Warp AI. Just type what you want in normal language!",
			},
			{
				title: "Create Your Projects Folder",
				description: "Set up a dedicated folder for all your workshop and development projects",
				content: "It's a good practice to keep all your coding projects in one organized place. Let's create a 'Projects' folder. In Warp, type or copy-paste these commands one at a time, pressing Enter after each:",
				codeBlock: {
					language: "bash",
					code: "cd ~\nmkdir -p Projects\ncd Projects\npwd",
				},
				note: "The last command 'pwd' shows you where you are. You should see something like '/Users/YourName/Projects' (Mac) or '/home/YourName/Projects' (Linux). This is where you'll create all your workshop projects!",
			},
			{
				title: "Set Up Your Preferences (Optional)",
				description: "Customize Warp to your liking",
				content: "Click the settings icon (⚙️) in the bottom-left corner. Here you can choose your favorite color theme, adjust the font size, and configure other preferences. For the workshop, the default settings work great!",
			},
		],
		troubleshooting: [
			{
				issue: "Mac: 'Warp cannot be opened because the developer cannot be verified'",
				solution: "This is a normal Mac security feature. Right-click (or Control+click) the Warp app in your Applications folder and select 'Open'. Click 'Open' again in the popup. You only need to do this once!",
			},
			{
				issue: "Warp AI is not working / not showing suggestions",
				solution: "Make sure you're signed in (check the bottom-left corner for your profile icon). Also check your internet connection - Warp AI needs internet to work. Try closing and reopening Warp.",
			},
			{
				issue: "I can't find Warp after installing it",
				solution: "Mac: Open Finder, click 'Applications' in the sidebar, and scroll down to find Warp. Linux: Press the Super/Windows key and type 'Warp' to search for it.",
			},
			{
				issue: "The terminal looks confusing / I don't know what to do",
				solution: "Don't worry! We'll teach you everything you need during the workshop. For now, just having Warp installed is enough. You can close it until the workshop.",
			},
		],
		nextSteps: [
			"Try typing a few # commands to see Warp AI in action",
			"Get comfortable with the interface - it's okay if you don't understand everything yet!",
			"Watch the short intro video at warp.dev/getting-started (optional)",
			"Remember: We'll cover how to use Warp during the workshop, so don't stress!",
		],
	},
	"docker": {
		id: "docker",
		name: "Docker",
		description: "Containerization platform for building, shipping, and running applications in isolated environments.",
		officialSite: "https://www.docker.com",
		prerequisites: [
			"A computer with macOS 11+, Windows 10/11, or Linux",
			"At least 4GB of free RAM (memory)",
			"Administrator access on your computer",
			"Windows users: Windows 10/11 Pro, Enterprise, or Education (Home edition requires extra setup)",
		],
		steps: [
			{
				title: "Download Docker Desktop",
				description: "Get the Docker Desktop installer for your computer",
				content: "Visit docker.com/products/docker-desktop and click the 'Download for Mac' or 'Download for Windows' button (it will detect your system automatically). For Linux users, click 'Download for Linux' and choose your distribution.",
				note: "The download is about 500MB-800MB, so it might take a few minutes depending on your internet speed.",
			},
			{
				title: "Install Docker Desktop",
				description: "Run the installer and follow the setup wizard",
				content: "For Mac: Open the downloaded .dmg file, drag the Docker icon to your Applications folder, and wait for it to copy. For Windows: Double-click the installer, accept the terms, and follow the prompts. If asked about WSL 2, say YES - this is important! For Linux: Follow the specific instructions for your distribution from the Docker website.",
				note: "Windows: The installer might ask to restart your computer - that's normal! Save any work before starting.",
			},
			{
				title: "Start Docker Desktop for the First Time",
				description: "Launch Docker Desktop and complete initial setup",
				content: "Mac: Open Docker from your Applications folder or Launchpad. Windows: Find Docker Desktop in your Start Menu. You'll see Docker starting up with a whale icon animation. The first start takes 2-3 minutes - be patient!",
				note: "You'll know Docker is ready when you see a small whale icon in your menu bar (Mac) or system tray (Windows).",
			},
			{
				title: "Accept the Service Agreement",
				description: "Docker will show you their terms of service",
				content: "When Docker Desktop opens for the first time, read and accept the Docker Subscription Service Agreement. For workshop purposes, the free tier is perfect!",
			},
			{
				title: "Skip the Tutorial (For Now)",
				description: "Docker offers a tutorial - you can skip it",
				content: "Docker Desktop might show you a welcome tutorial. You can click 'Skip Tutorial' - we'll learn everything we need during the workshop!",
			},
			{
				title: "Verify Docker is Working",
				description: "Test that Docker is installed correctly",
				content: "Open Warp (or your regular terminal) and run these two commands to verify Docker is working:",
				codeBlock: {
					language: "bash",
					code: "docker --version\ndocker run hello-world",
				},
				note: "The first command shows Docker's version. The second command downloads and runs a tiny test container. You should see 'Hello from Docker!' in the output. This means everything is working!",
			},
			{
				title: "Create a Docker Hub Account (Optional but Recommended)",
				description: "Sign up for a free Docker Hub account",
				content: "Visit hub.docker.com and click 'Sign Up'. Create a free account with your email. This lets you download pre-made containers and share your own. You don't need to do this right now, but it's useful for the workshop.",
				note: "You can skip this step and create an account later if you prefer.",
			},
		],
		troubleshooting: [
			{
				issue: "Windows: 'WSL 2 installation is incomplete' error",
				solution: "Open PowerShell as Administrator (right-click Start Menu > Windows PowerShell (Admin)) and run: wsl --install and then wsl --update. Restart your computer after this completes. Then try starting Docker Desktop again.",
			},
			{
				issue: "The Docker whale icon isn't appearing / Docker won't start",
				solution: "First, try restarting your computer - this solves most startup issues. If it still doesn't work, make sure you have at least 4GB of free RAM. Close other applications and try again. For Mac: Check System Preferences > Security & Privacy to allow Docker.",
			},
			{
				issue: "'docker' command not found in terminal",
				solution: "Docker Desktop might still be starting up - wait 2-3 minutes and try again. If it still doesn't work, quit Docker Desktop completely and restart it. Make sure you see the whale icon before running commands.",
			},
			{
				issue: "Windows Home edition: 'Docker Desktop requires Windows 10 Pro/Enterprise'",
				solution: "Windows Home users need to enable WSL 2 first. Follow Microsoft's guide to install WSL 2, then install Docker Desktop. Alternatively, consider upgrading to Windows Pro, or use a Linux distribution instead.",
			},
			{
				issue: "Mac: 'Docker.app is damaged and can't be opened'",
				solution: "This is a security feature. Open Terminal and run: sudo xattr -rd com.apple.quarantine /Applications/Docker.app and enter your password. Then try opening Docker again.",
			},
		],
		nextSteps: [
			"Make sure you see the Docker whale icon in your menu bar/system tray",
			"Try running 'docker run hello-world' to confirm everything works",
			"Don't worry about learning Docker commands yet - we'll cover that in the workshop!",
			"If you created a Docker Hub account, remember your username and password",
		],
	},
	"serena-mcp": {
		id: "serena-mcp",
		name: "Serena MCP",
		description: "Model Context Protocol server for enhanced AI context management and tool integration.",
		officialSite: "https://github.com/oraios/serena",
		prerequisites: [
			"A computer with macOS, Windows, or Linux",
			"Python 3.10 or newer installed",
			"Claude Code installed (from Step 2)",
			"Basic familiarity with terminal/command line",
		],
		steps: [
			{
				title: "Install uv (Python Package Manager)",
				description: "First, install 'uv' - a fast Python package manager",
				content: "Serena uses 'uv' to manage its installation. Open Warp (or your terminal) and run this command based on your operating system:",
				codeBlock: {
					language: "bash",
					code: "# For Mac and Linux:\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# For Windows (PowerShell):\npowershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\"",
				},
				note: "After installation, close and reopen your terminal to activate 'uv'.",
			},
			{
				title: "Verify uv Installation",
				description: "Make sure uv is installed correctly",
				content: "Run this command to check that uv is working:",
				codeBlock: {
					language: "bash",
					code: "uv --version",
				},
				note: "You should see a version number like '0.x.x'. If you get 'command not found', try closing and reopening your terminal.",
			},
			{
				title: "Test Serena MCP",
				description: "Run Serena once to make sure it works",
				content: "Use this command to test that Serena can start. This will download and run Serena directly from GitHub:",
				codeBlock: {
					language: "bash",
					code: "uvx --from git+https://github.com/oraios/serena serena start-mcp-server",
				},
				note: "The first time you run this, it will download Serena. This is normal and takes about 30 seconds. Press Ctrl+C to stop the server after you see it start successfully.",
			},
			{
				title: "Configure Claude Code to Use Serena",
				description: "Connect Serena to Claude Code",
				content: "We need to tell Claude Code about Serena. Open (or create) the Claude Code configuration file. On Mac/Linux this is at ~/.claude/claude_desktop_config.json and on Windows it's at %APPDATA%/Claude/claude_desktop_config.json. Add this configuration:",
				codeBlock: {
					language: "json",
					code: `{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/oraios/serena",
        "serena",
        "start-mcp-server"
      ]
    }
  }
}`,
				},
				note: "If the file already exists with other MCP servers, just add the 'serena' section inside 'mcpServers'. Be careful with commas in JSON!",
			},
			{
				title: "Restart Claude Code",
				description: "Close and reopen Claude Code to load Serena",
				content: "Completely quit Claude Code (not just close the window) and start it again. When it restarts, it will connect to Serena automatically.",
				note: "On Mac: Cmd+Q to quit. On Windows: Right-click the Claude icon in the system tray and select 'Quit'.",
			},
			{
				title: "Verify Serena is Connected",
				description: "Check that Claude Code sees Serena",
				content: "In Claude Code, you should see Serena MCP listed in the available tools or MCP servers. Try asking Claude something like: 'What MCP servers are available?' to confirm Serena is connected.",
				note: "During the workshop, we'll explore all of Serena's features together!",
			},
		],
		troubleshooting: [
			{
				issue: "'uv' command not found",
				solution: "Close your terminal completely and open a new one. The installation adds 'uv' to your PATH, but you need a fresh terminal. If it still doesn't work, try restarting your computer. On Windows, make sure you ran the PowerShell command as Administrator.",
			},
			{
				issue: "'uvx' command fails or times out",
				solution: "Make sure you have a stable internet connection - uvx needs to download Serena from GitHub. If you're behind a firewall or proxy, uvx might not be able to connect. Try again on a different network.",
			},
			{
				issue: "Claude Code doesn't show Serena MCP",
				solution: "Double-check your claude_desktop_config.json file for syntax errors (missing commas, brackets, etc). Make sure you completely quit and restarted Claude Code. Check Claude Code's logs (Settings > Developer > View Logs) for any error messages about Serena.",
			},
			{
				issue: "Python errors when starting Serena",
				solution: "Make sure you have Python 3.10 or newer installed. Check with: python --version or python3 --version. If your Python is too old, download the latest from python.org.",
			},
		],
		nextSteps: [
			"Don't worry if this seems complex - we'll walk through it together at the workshop!",
			"Make sure Claude Code shows Serena in the MCP list",
			"You don't need to understand how Serena works yet - just have it installed",
			"Read the Serena documentation at github.com/oraios/serena if you're curious!",
		],
	},
	"context7": {
		id: "context7",
		name: "Context7",
		description: "Get up-to-date documentation and code examples directly in Claude Code from the source.",
		officialSite: "https://context7.com",
		prerequisites: [
			"Claude Code installed (from Step 2)",
			"An email address for Context7 account",
			"Internet connection",
		],
		steps: [
			{
				title: "Create Your Context7 Account",
				description: "Sign up for a free Context7 account to get your API key",
				content: "Visit context7.com and click 'Sign Up' or 'Get Started'. You can sign up with your email, Google, or GitHub account. It's completely free!",
				note: "You'll need this account to get your API key in the next step.",
			},
			{
				title: "Get Your API Key",
				description: "Access your personal API key from the dashboard",
				content: "After signing up, you'll be taken to your dashboard at context7.com/dashboard. Look for your API key on this page - it will look like a long string of letters and numbers (as shown in the image below). Copy this API key - you'll need it in the next step!",
				image: {
					src: "/images/context7-dashboard.png",
					alt: "Context7 dashboard showing where to find your API key",
				},
				note: "Keep your API key private! Don't share it with anyone or post it publicly.",
			},
			{
				title: "Add Context7 to Claude Code",
				description: "Connect Context7 to your Claude Code installation",
				content: "Open Warp (or your terminal) and run this command. Make sure to replace YOUR_API_KEY with the actual API key you copied from the dashboard:",
				codeBlock: {
					language: "bash",
					code: 'claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: YOUR_API_KEY"',
				},
				note: "Paste your actual API key where it says YOUR_API_KEY. Keep the quotes around the header!",
			},
			{
				title: "Verify the Installation",
				description: "Make sure Context7 was added successfully",
				content: "After running the command, you should see a success message saying Context7 has been added to Claude Code. You can verify by starting Claude Code and checking if Context7 appears in the available MCP servers.",
				codeBlock: {
					language: "bash",
					code: "claude",
				},
				note: "Once Claude Code starts, you can ask 'What MCP servers are available?' to confirm Context7 is there.",
			},
			{
				title: "Test Context7",
				description: "Try using Context7 in Claude Code",
				content: "In Claude Code, try asking a question with 'use context7' in your prompt. For example: 'use context7 to show me examples of React hooks'. Context7 will fetch the latest documentation and examples!",
				note: "We'll explore all the cool things Context7 can do during the workshop!",
			},
		],
		troubleshooting: [
			{
				issue: "'claude' command not found",
				solution: "Make sure Claude Code is installed correctly (see Step 2). Close and reopen your terminal after installing Claude Code. If it still doesn't work, restart your computer.",
			},
			{
				issue: "Invalid API key error",
				solution: "Double-check that you copied your API key correctly from context7.com/dashboard. Make sure there are no extra spaces before or after the key. The key should be inside the quotes in the command.",
			},
			{
				issue: "Context7 doesn't show up in Claude Code",
				solution: "Restart Claude Code completely (quit and reopen it). Run 'claude mcp list' in your terminal to see if Context7 is in the list. If not, try running the add command again.",
			},
			{
				issue: "Permission or authentication errors",
				solution: "Make sure you're signed in to your Context7 account. Try logging out and back in at context7.com. Generate a new API key from the dashboard and try the add command again with the new key.",
			},
		],
		nextSteps: [
			"Practice using 'use context7' in your Claude Code prompts",
			"Try asking for documentation on different programming languages or frameworks",
			"Don't worry about memorizing commands - we'll practice together at the workshop!",
			"Explore the Context7 dashboard at context7.com/dashboard",
		],
	},
	"github": {
		id: "github",
		name: "GitHub",
		description: "Version control and collaboration platform for managing code repositories and project workflows.",
		officialSite: "https://github.com",
		prerequisites: [
			"An email address",
			"A web browser (Chrome, Firefox, Safari, or Edge)",
		],
		steps: [
			{
				title: "Sign Up for GitHub",
				description: "Create your free GitHub account",
				content: "Visit github.com and click 'Sign up'. Choose a unique username (this will be your GitHub identity!), provide your email address, and create a strong password. Follow the prompts to complete the signup process.",
				note: "Choose a professional username - you might use this for your career!",
			},
			{
				title: "Verify Your Email",
				description: "Activate your account by verifying your email",
				content: "Check your email inbox for a verification email from GitHub (check spam/junk folder if you don't see it). Click the verification link in the email to activate your account. This is important - you can't use all of GitHub's features until you verify!",
				note: "If you don't receive the email after a few minutes, you can request a new verification email from GitHub.",
			},
			{
				title: "Set Up Your Profile",
				description: "Add some information about yourself",
				content: "Click on your profile icon in the top-right corner and select 'Your profile'. Add a profile picture (it can be a photo or an avatar), and optionally add a short bio. This helps people recognize you when you collaborate on projects!",
				note: "You can always update your profile later, so don't worry about making it perfect right now.",
			},
		],
		troubleshooting: [
			{
				issue: "Username already taken",
				solution: "GitHub usernames must be unique. Try adding numbers or underscores to your preferred username (e.g., john_smith, johnsmith123). Keep it professional since you might use this for work!",
			},
			{
				issue: "Didn't receive verification email",
				solution: "Check your spam/junk folder. If it's not there, log into GitHub, and you should see a banner at the top prompting you to resend the verification email. Click 'Resend verification email'.",
			},
			{
				issue: "Can't upload profile picture",
				solution: "Make sure your image is in a common format (JPG, PNG, GIF) and under 10MB. Try using a smaller image or a different browser if it still doesn't work.",
			},
		],
		nextSteps: [
			"Explore GitHub's interface - click around and familiarize yourself!",
			"Don't worry about Git, repositories, or any technical stuff yet",
			"We'll cover all the Git and GitHub workflows together in the workshop",
			"Just having your account created and verified is perfect for now!",
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
