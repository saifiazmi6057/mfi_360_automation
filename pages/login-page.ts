import { TestInfo } from "playwright/test";

export class Login {
    usernameInput: string = "#TxtUserId";
    passwordInput: string = "#TxtPwd";
    loginButton: string = "#BtnSubmit";
    page: any;
    testInfo: TestInfo;

    constructor(page: any, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async login(username?: string, password?: string) {
        if (!username) {
            username = this.testInfo.project?.metadata?.username;
        }
        if (!password) {
            password = this.testInfo.project?.metadata?.password;
        }

        // Prefer metadata.baseUrl, then env BASE_URL, then fallback default
        const baseUrl = this.testInfo.project?.metadata?.baseUrl || process.env.BASE_URL || 'https://mfi360-uat.icraanalytics.co.in:8443';
        const targetUrl = `${baseUrl.replace(/\/$/, '')}/Account/Login`;

        try {
            // explicit waitUntil and timeout to produce clearer errors
            await this.page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });
        } catch (err: any) {
            const message = `Failed to navigate to ${targetUrl}: ${err?.message || err}. Ensure the runner can resolve and reach the host (DNS / firewall / hosts file / VPN).`;
            console.error(message);
            // rethrow with extra context so CI logs include it
            throw new Error(message);
        }

        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
        await this.page.waitForSelector('a.user-profile:visible', { timeout: 15000 });
    }
}