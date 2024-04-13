import React from 'react';
import Footer from '../components/Footer';

const TermsofUsePolicies = () => {

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '10px',
        },
        paragraph: {
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '15px',
        },
        list: {
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '15px',
            paddingLeft: '20px',
        },
        listItem: {
            marginBottom: '8px',
        },
    };

    return (
        <>
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Shareable!</h1>
            <p style={styles.paragraph}>
                Shareable is a platform that enables creators (known as "Sharers") to share and sell their content with users ("Users") who subscribe or purchase these offerings. By using Shareable, you agree to comply with these Terms of Use and Policies.
            </p>
            
            <h2 style={styles.heading}>Sharers</h2>
            <p style={styles.paragraph}>
                Sharers on Shareable are individuals or entities who create and post content for sale or subscription on the platform. To become a Sharer, you must register with an email associated with your PayPal account for payment processing purposes. This helps us ensure that payments are properly managed and credited to the correct Sharer account.
            </p>
            
            <h2 style={styles.heading}>Payments</h2>
            <p style={styles.paragraph}>
                Payments on Shareable are processed securely through PayPal. When a User purchases or subscribes to content from a Sharer, 20% of the payment amount is retained by Shareable, and the remaining 80% is credited to the Sharer's account. By using Shareable, you agree to this revenue sharing model.
            </p>
            <p style={styles.paragraph}>
                Additionally, all payments made through Shareable are non-refundable once processed through PayPal. Shareable is not responsible for any disputes related to payments or refunds. If you have any payment-related inquiries, please contact our support team for assistance.
            </p>
            
            <h2 style={styles.heading}>Restrictions</h2>
            <ul style={styles.list}>
                <li style={styles.listItem}>No Illegal Content: Users and Sharers must not post or sell any content that violates local, national, or international laws or regulations.</li>
                <li style={styles.listItem}>No Copyright Infringement: Users and Sharers must not post or sell content that infringes upon the copyrights or intellectual property rights of others.</li>
                <li style={styles.listItem}>No Harmful or Offensive Content: Content that promotes violence, discrimination, hatred, or any form of offensive material is strictly prohibited.</li>
                <li style={styles.listItem}>No Fraudulent Activities: Users and Sharers must not engage in fraudulent activities, including but not limited to phishing, scamming, or impersonation.</li>
                <li style={styles.listItem}>No Spam or Misleading Content: Users and Sharers must not use Shareable to distribute spam, misleading information, or engage in deceptive practices.</li>
                <li style={styles.listItem}>No Unauthorized Use of Personal Information: Users and Sharers must not collect or use personal information of others without their consent.</li>
                <li style={styles.listItem}>Compliance with Community Standards: Users and Sharers must adhere to Shareable's community standards and guidelines.</li>
            </ul>
            
            <p style={styles.paragraph}>
                Violation of these restrictions may result in the removal of content, suspension, or termination of your account on Shareable.
            </p>
            
            <p style={styles.paragraph}>
                By using Shareable, you acknowledge and agree to these terms and policies. Shareable reserves the right to modify or update these terms and policies at any time. It is your responsibility to review these terms periodically for any changes. If you do not agree with these terms, please refrain from using Shareable.
            </p>
        </div>
        <Footer />
        </>
    );
};

export default TermsofUsePolicies;
