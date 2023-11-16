<template>
  <div class="loader-container">
    <div class="loader">
      <div class="loader__child"></div>
      <div class="loader__child loader__child--second"></div>
    </div>
    <p class="loader-container__text">
      <slot />
    </p>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_variables.scss';

  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 50;

    .loader {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;

      &__child {
        position: absolute;
        border: 4px solid $accent;
        opacity: 1;
        border-radius: 50%;
        animation: pulse 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

        &--second {
          animation-delay: -0.5s;
        }
      }
    }

    &__text {
      color: gray;
      font-size: small;
      text-align: center;
      margin-top: 3px;
    }
  }

  @keyframes pulse {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
</style>
