import styled from "styled-components";

export const StyledComponent = styled.div`
  .notify-badge {
    vertical-align: middle;
  }
  .button-notify {
    border: none;
    padding: 0;
    display: flex;
    width: auto;
    height: auto;
    font-size: 20px;
    line-height: normal;
    align-items: center;
    background-color: transparent;
    &:focus,
    &:active {
      background-color: transparent;
      border: none;
    }
  }
  .ant-layout-header {
    transition: 0.3s;

    &.hide {
      top: -55px;
    }
    &.show {
      top: 0;
    }
  }
  .drop-down-button {
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    z-index: 1;
    padding: 5px 10px 10px;
    top: 100%;

    button {
      display: block;
      border-radius: 50%;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
  .logo-header img {
    width: 80px;
    height: auto;
  }

  .markup-env {
    img {
      height: 30px;
    }
  }
  .avatar {
    flex-shrink: 0;
  }
  .support {
    display: flex;
    column-gap: 24px;
    &-link {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &-icon {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }
  }
`;
