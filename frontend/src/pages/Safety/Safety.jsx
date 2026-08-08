import "./Safety.css";

function Safety() {
  return (
    <div className="safety-page">
      <div className="safety-container">

        <div className="safety-header">
          <div className="safety-icon">🛡️</div>

          <h1>Worker Spot Safety Guidelines</h1>

          <p>
            Your safety comes first. Please follow these guidelines
            whenever you connect with a customer or worker through
            Worker Spot.
          </p>
        </div>

        <div className="safety-warning">
          <strong>Important:</strong>

          <p>
            Worker Spot helps customers and workers connect. Always use
            your own judgement and take reasonable precautions before,
            during and after a service.
          </p>
        </div>

        <section className="safety-section">
          <h2>1. Before Accepting a Service</h2>

          <ul>
            <li>Check the other person's profile and available information.</li>
            <li>Confirm the service that is being requested.</li>
            <li>Confirm the expected charges before starting the work.</li>
            <li>Confirm the approximate time and location of the service.</li>
            <li>Do not accept suspicious or illegal service requests.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>2. Meeting Someone for the First Time</h2>

          <ul>
            <li>Where practical, meet in a safe and appropriate environment.</li>
            <li>Tell a trusted person where you are going when appropriate.</li>
            <li>Keep your phone available and charged.</li>
            <li>Verify that the person you meet is the person you expected.</li>
            <li>Do not allow unnecessary access to private areas of your home.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>3. Customer Safety</h2>

          <ul>
            <li>Do not share unnecessary personal information with workers.</li>
            <li>Clearly explain the work that needs to be performed.</li>
            <li>Do not request illegal, dangerous or unsafe work.</li>
            <li>Keep valuable personal belongings secure.</li>
            <li>Do not tolerate threats, harassment or inappropriate behaviour.</li>
            <li>End the interaction if you feel unsafe.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>4. Worker Safety</h2>

          <ul>
            <li>Review the service request before accepting it.</li>
            <li>Ask for clarification if the work requirements are unclear.</li>
            <li>Do not enter an unsafe location.</li>
            <li>Do not perform work that you are not qualified or equipped to perform.</li>
            <li>Use appropriate safety equipment for the work.</li>
            <li>Leave the location if you face a serious safety threat.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>5. Protect Your Personal Information</h2>

          <ul>
            <li>Never share your password with another person.</li>
            <li>Do not share OTPs or authentication codes.</li>
            <li>Do not share unnecessary financial information.</li>
            <li>Avoid publishing your complete home address publicly.</li>
            <li>Do not share another person's personal information without permission.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>6. Payments and Fraud</h2>

          <ul>
            <li>Use only the payment methods supported by Worker Spot.</li>
            <li>Never provide your password or OTP to another person.</li>
            <li>Do not accept requests to manipulate service credits.</li>
            <li>Do not make false refund claims.</li>
            <li>Report suspicious payment activity immediately.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>7. Offline Communication Safety</h2>

          <p>
            Worker Spot may provide offline connection features in the future.
            Offline communication can work differently from communication
            through the internet.
          </p>

          <ul>
            <li>Connect only with the intended Worker Spot user.</li>
            <li>Do not accept unknown or unexpected connection requests.</li>
            <li>Do not exchange unnecessary private information.</li>
            <li>End the connection if suspicious behaviour is detected.</li>
            <li>Report serious security problems to Worker Spot.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>8. Prohibited Behaviour</h2>

          <ul>
            <li>Threatening another user.</li>
            <li>Harassment or intimidation.</li>
            <li>Sexual harassment or inappropriate behaviour.</li>
            <li>Discrimination or hateful behaviour.</li>
            <li>Violence or threats of violence.</li>
            <li>Fraud or impersonation.</li>
            <li>Illegal activities.</li>
            <li>Intentional damage to another person's property.</li>
            <li>Unauthorised collection or misuse of personal information.</li>
          </ul>
        </section>

        <section className="safety-section">
          <h2>9. If You Feel Unsafe</h2>

          <ol>
            <li>Move to a safe location if possible.</li>
            <li>Stop the service or interaction if necessary.</li>
            <li>Contact someone you trust.</li>
            <li>Report the incident to Worker Spot.</li>
            <li>
              If there is an immediate danger, contact the appropriate
              emergency authorities.
            </li>
          </ol>
        </section>

        <section className="safety-section">
          <h2>10. Report Problems</h2>

          <p>
            Report fraud, threats, harassment, suspicious accounts,
            unsafe behaviour or serious service problems through the
            official Worker Spot support channel.
          </p>

          <p>
            When reporting an incident, provide accurate information and
            relevant evidence where it is safe and lawful to do so.
          </p>
        </section>

        <div className="safety-footer">
          <strong>Stay Safe. Work Safe. Connect Responsibly.</strong>

          <p>
            Worker Spot is designed to make local service connections easier,
            but every user has a responsibility to make safe decisions.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Safety;