<!-- BadgeAuthor.vue -->
<!-- This component displays a badge linking to the GitHub repository of the Event-WebApp project. 
     It can be positioned either statically or fixed at the bottom right corner of the screen. -->

<!-- ERROR-FIX Improve Style -->

<template>
    <div :class="badgeClass">
      <a href="https://github.com/FJXHI/Event-WebApp" target="_blank" class="badge-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="github-icon" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
        </svg>
        <div class="text-container">
          <span class="powered-by">Powered by</span>
          <span class="app-name">Event-WebApp</span>
          <span class="copyright">
            &copy; 2025 FJXHI
          </span>
        </div>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      position: {
        type: String,
        default: "static", // Optionen: 'static' oder 'fixed'
      }
    },
    computed: {
      badgeClass() {
        return this.position === "fixed" ? "badge fixed-badge" : "badge";
      }
    }
  };
  </script>
  
  <style scoped>
  .badge {
    padding: 8px 0px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
  }
  
  .badge a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  
  .github-icon {
    margin-right: 6px;
  }
  
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Rechtsbündig */
    line-height: 1.3;
  }
  
  .powered-by {
    font-size: 13px;
    font-weight: bold;
  }
  
  .app-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .copyright {
    font-size: 14px;
    align-items: center;
  }
  
  .fixed-badge {
    background-color: #222;
    padding: 8px 12px;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  </style>
  