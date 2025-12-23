import styles from "./css/About.module.css";

const About = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.content}>
        <section className={styles.section}>
          <h1 className={styles.section_title}>Project Guide</h1>
          <div className={styles.cards_row}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  {/* Replace the src below with your guide's photo later */}
                  <img
                    src="https://via.placeholder.com/120x120.png?text=Guide"
                    alt="Dr. Shri Prakash Dwivedi"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card_title}>Dr. Shri Prakash Dwivedi</h2>
                <p className={styles.card_subtitle}>Project Guide</p>
                <p className={styles.card_text}>
                  Guiding the research, methodology, and clinical relevance of the
                  brain tumor detection system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h1 className={styles.section_title}>Team Members</h1>
          <div className={styles.cards_grid}>
            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=DM"
                    alt="Dipesh Maindolia"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card_title}>Dipesh Maindolia</h2>
                <p className={styles.card_subtitle}>ID: 58875</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=PB"
                    alt="Pankaj Bhandari"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card_title}>Pankaj Bhandari</h2>
                <p className={styles.card_subtitle}>ID: 58950</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.avatar_wrapper}>
                <div className={styles.avatar_circle}>
                  <img
                    src="https://via.placeholder.com/120x120.png?text=NS"
                    alt="Nikunj Sharma"
                  />
                </div>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card_title}>Nikunj Sharma</h2>
                <p className={styles.card_subtitle}>ID: 58948</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
