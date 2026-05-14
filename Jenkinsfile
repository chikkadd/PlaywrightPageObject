pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy' 
            args '-u root'   // run as root so npm install works
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chikkadd/PlaywrightPageObject.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                    publishHTML([reportDir: 'playwright-report',
                                 reportFiles: 'index.html',
                                 reportName: 'Playwright Test Report'])
                }
            }
        }
    }
}
