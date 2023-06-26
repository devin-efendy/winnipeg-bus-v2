<div class="scrollable"><slot /></div>

<style>
  @property --thumb-color {
    syntax: '<color>';
    inherits: true;
    initial-value: rgba(255, 255, 255, 0);
  }

  @keyframes scrollBarThumbFadeIn {
    0% {
      --thumb-color: rgba(255, 255, 255, 0);
    }

    100% {
      --thumb-color: rgba(255, 255, 255, 0.2);
    }
  }

  @keyframes scrollBarThumbFadeOut {
    0% {
      --thumb-color: rgba(255, 255, 255, 0.2);
    }

    100% {
      --thumb-color: rgba(255, 255, 255, 0);
    }
  }

  .scrollable {
    height: inherit;
    overflow-y: overlay;

    animation: scrollBarThumbFadeOut 0.15s ease-in-out forwards;
  }

  .scrollable:hover {
    animation: scrollBarThumbFadeIn 0.15s ease-in-out forwards;
  }

  .scrollable::-webkit-scrollbar {
    width: 16px;
    background: transparent;
  }

  .scrollable::-webkit-scrollbar-thumb {
    background: var(--thumb-color);
    background-clip: padding-box;
    border-radius: 9999px;

    border-right: 3px solid transparent;
    border-left: 3px solid transparent;
  }
</style>
