import React from 'react';
import styles from './Services.module.css';

const servicesData = [
  {
    category: 'Big Data & Analytics, AI & Data Science',
    services: [
      'Data Engineering: Data Modeling, Big Data & Graph & Analytical DB, Data Ingestion, Batch & Real-Time Processing, Knowledge Harvesting.',
      'Data Science: Use-Case Define & ROI prioritization, Custom Machine Learning Models, Operationalize ML Models, Enhancement & Calibration ML Models.',
      'Data Visualization / Consumption: Analytical and Operational Dashboards & Reporting, Alerts & Notifications, Data as a Service, Integrate Web & Mobile Apps',
      'AI & Machine Learning Knowledge Discovery: Knowledge Tabs & Dashboards, Data Storytelling, 360º Digital Insights.',
      'Tools: Kafka, Spark, Hadoop, Cloudera, Stratio, Neo4j, Python, Tensor Flow, Microstrategy, Tableau, Confluent, Airflow, Informatica, GCP, AWS, Azure, SAP, Qlik, Power BI.',
    ]
  },
  {
    category: 'Digital Product Development',
    services: [
      'Product/Software Development: Create digital platforms & products (Mobile & Web), transform client software platforms to a digital ecosystem, API development & Integration.',
      'Quality Engineering: Testing Consultancy, Digital Testing, Automation Testing, Performance Testing, Traditional Testing.',
      'Agile: Product Discovery together with Enterprise UX, Agile Teams, DevSecOps.',
      'Tools: iOS, Swift, Android, Kotlin, HTML, JAVA, IONIC, Zephyr, Microfocus, DotNet, C#, Bootstrap, SonarQube, Appian, Fortify, Angular, React, Kubernetes, docker, spring, JFrog Artifactory, JIRA, Cofluence, Bitbucket, Jenkins, JMeter, Grafana, AWS, Azure, Visual Studio, Azure DevOps, OpenShift.',
      'Differentiators: Integration of key areas, Agile teams, Cloud native development, Experience in product development, Innovation focus.'
    ]
  },
  {
    category: 'Digital Product Development',
    services: [
      'Product/Software Development: Create digital platforms & products (Mobile & Web), transform client software platforms to a digital ecosystem, API development & Integration.',
      'Quality Engineering: Testing Consultancy, Digital Testing, Automation Testing, Performance Testing, Traditional Testing.',
      'Agile: Product Discovery together with Enterprise UX, Agile Teams, DevSecOps.',
      'Tools: iOS, Swift, Android, Kotlin, HTML, JAVA, IONIC, Zephyr, Microfocus, DotNet, C#, Bootstrap, SonarQube, Appian, Fortify, Angular, React, Kubernetes, docker, spring, JFrog Artifactory, JIRA, Cofluence, Bitbucket, Jenkins, JMeter, Grafana, AWS, Azure, Visual Studio, Azure DevOps, OpenShift.',
      'Differentiators: Integration of key areas, Agile teams, Cloud native development, Experience in product development, Innovation focus.'
    ]
  },
  // Agregar más categorías y servicios según sea necesario
];

function Services() {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <h1>Services</h1>
      </div>
      <div className={styles.servicesContainer}>
        {servicesData.map((serviceCategory, index) => (
          <div className={styles.serviceCard} key={index}>
            <h2>{serviceCategory.category}</h2>
            <ul>
              {serviceCategory.services.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
