# Codex 部署与三方中转站配置（CC Switch 导入）

这篇教程讲清楚三件事：**Codex 怎么装**、**三方中转站怎么接**、**怎么用 CC Switch 一键导入和切换**。

## 先理清几个概念

| 名词 | 是什么 | 地址 |
| --- | --- | --- |
| **Codex** | OpenAI 出的编码 Agent，能在终端、IDE 和桌面客户端里跑 | https://github.com/openai/codex |
| **ChatGPT 客户端** | 就是你现在用的那个 Agent 客户端。Codex 已经整合进 ChatGPT，登录 ChatGPT 账号即可直接使用，不需要单独订阅 | https://chatgpt.com/codex |
| **CC Switch** | 跨平台桌面工具，用来一键切换 Claude Code / Codex 等的 API 提供方，免去手改配置文件 | https://ccswitch.io |
| **三方中转站** | 提供 OpenAI / Anthropic 兼容接口的服务商，通常价格更低、无需代理直连 | 各家不同，见下文 |

::: tip 一句话理解
**Codex** 是干活的工具，**ChatGPT 客户端**是你日常打开它的入口，**中转站**是给它换一条更便宜好连的"网络通道"，**CC Switch** 是帮你切换通道的遥控器。
:::

## 一、安装 Codex

### Windows

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

### macOS / Linux

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### 其他安装方式

```bash
# 通过 npm
npm install -g @openai/codex

# 通过 Homebrew（macOS）
brew install --cask codex
```

也可以到 [GitHub Releases](https://github.com/openai/codex/releases/latest) 手动下载对应平台的压缩包。

### 首次登录

安装后运行 `codex`，选择 **Sign in with ChatGPT**，用你的 ChatGPT 账号登录即可。官方文档见 https://developers.openai.com/codex 。

## 二、Codex 的配置文件（细节）

这部分是理解中转站配置的关键，配置写不对基本都栽在这里。

### 文件位置

| 文件 | 作用 |
| --- | --- |
| `~/.codex/config.toml` | 用户级主配置，中转站就是改这里 |
| `.codex/config.toml` | 项目级覆盖，放在仓库里，**只有你信任该项目时才会加载** |
| `~/.codex/auth.json` | 登录凭据 |
| `$CODEX_HOME` | 可用环境变量改配置目录，默认 `~/.codex` |

Windows 下 `~` 就是 `C:\Users\你的用户名`。

### 关键字段

```toml
model = "gpt-5.2-codex"        # 模型名，以中转站文档为准
model_provider = "custom"       # 指向下面定义的 provider

[model_providers.custom]
name = "我的中转站"
base_url = "https://api.example.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
```

| 字段 | 说明 |
| --- | --- |
| `model_provider` | 选哪个 provider，默认 `openai` |
| `base_url` | 中转站接口地址，**通常要带 `/v1`** |
| `env_key` | 存放密钥的环境变量名，Codex 从该变量读 Key |
| `wire_api` | 协议，**只支持 `responses`**，省略时默认就是它 |

### 几个容易踩的坑

::: warning 注意
- **`wire_api` 只支持 `responses`**，写 `chat` 之类的会直接报错。
- **内置 provider ID 是保留的**：`openai`、`ollama`、`lmstudio` 不能自定义覆盖，自己的 provider 要另起名字。
- **项目级配置不能改 provider**：`model_provider`、`model_providers`、`openai_base_url` 写在 `.codex/config.toml` 里会被忽略，必须放在用户级配置。
- 如果只是想让官方 OpenAI 走代理，可以直接用 `openai_base_url`，不用新建 provider。
:::

## 三、安装 CC Switch

CC Switch 是桌面应用（Tauri 构建），提供 Windows / macOS / Linux 版本。

| 平台 | 安装方式 |
| --- | --- |
| Windows | 下载 `CC-Switch-v{版本}-Windows.msi`，或免安装的 `-Windows-Portable.zip` |
| macOS | `brew install --cask cc-switch`，或下载 `.dmg` |
| Linux | 下载 `.deb` / `.rpm` / `.AppImage` |

- 官网：https://ccswitch.io
- 项目地址：https://github.com/farion1231/cc-switch
- 下载页：https://github.com/farion1231/cc-switch/releases
- 无图形界面的服务器：用社区版 [CC Switch CLI](https://github.com/SaladDay/cc-switch-cli)

::: tip 首次启动
CC Switch 会自动把你已有的 Codex 配置导入为一个叫 `default` 的 provider，并额外添加一个官方 provider，所以你原来的配置不会丢。
:::

## 四、用 CC Switch 导入中转站

这是本篇的核心流程。

### 1. 添加中转站

打开 CC Switch，切到 **Codex** 页签 → 点工具栏的 **"添加提供方"（+）** → 从内置的 **90+ 预设**里选中转站，或者手动新建自定义配置 → 填入你的 **API Key**。

### 2. 切换并启用

在列表里选中刚加的 provider → 点 **"启用"**。

### 3. 重启终端生效

::: warning 重要
Claude Code 切换后**不用重启**，但 **Codex 必须重启终端或 CLI 工具**才会读取新配置。忘了这步会以为切换失败。
:::

### 4. 切回官方

在列表里选回内置的官方 provider → 重启 Codex → 重新走一遍 ChatGPT 登录流程即可。

### 5. 系统托盘快速切换

Codex 支持在**系统托盘**直接点 provider 名字切换，不用打开主界面。

### 关于"本地路由"

如果中转站只提供 Anthropic（Claude）格式，而你想在 Codex 里用，需要打开本地路由：**设置 → 路由 → 本地路由**，打开"路由总开关"，再在"启用路由的工具"里勾上 Codex。CC Switch 会在本机转发请求并自动转换 API 格式。

## 五、兼容性说明

| 项目 | 情况 |
| --- | --- |
| 协议 | Codex 只认 `responses` 协议；中转站必须支持 Responses API，或由 CC Switch 本地路由转换 |
| 模型名 | 必须填中转站实际提供的模型名，填错会报模型不存在 |
| `base_url` | 大多数中转站要求带 `/v1` 后缀 |
| 密钥 | 走 `env_key` 指定的环境变量，CC Switch 会自动写入，无需手动改 |
| 切换粒度 | CC Switch 只替换**连接信息**（地址、密钥、模型），你自己加的 MCP、插件、注释都会保留 |
| 数据目录 | 默认 `~/.cc-switch`，可用 WebDAV 同步；设备相关文件不会上传 |
| WSL | CC Switch 不会自动识别 WSL，需要在"设置 → 高级 → 配置目录"里手动把路径指向 `\\wsl.localhost\...`；且本地路由在 WSL2 默认 NAT 模式下不通，要改成 mirrored 模式 |
| 系统要求 | Windows 10+ / macOS 12+ / Linux 需 glibc 2.35+ 和 WebKitGTK 4.1 |

::: warning 使用须知
用订阅账号（ChatGPT / Copilot 等）在非官方客户端里调用，可能违反服务商条款，风险请自行评估。
:::

## 六、不用 CC Switch 的手动改法

如果你不想装图形工具，直接编辑 `~/.codex/config.toml` 也行：

```toml
model = "gpt-5.2-codex"
model_provider = "relay"

[model_providers.relay]
name = "我的中转站"
base_url = "https://api.example.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "responses"
```

然后在系统里设置环境变量：

```powershell
# Windows PowerShell（永久生效）
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-你的密钥", "User")
```

```bash
# macOS / Linux
export OPENAI_API_KEY="sk-你的密钥"
```

保存后**重启终端**再运行 `codex`。

## 七、常见问题

**切换后没反应？**
Codex 需要重启终端。这是最常见的"切换失败"原因。

**报 `wire_api` 相关错误？**
检查是不是写成了 `chat`，改成 `responses`。

**报 401 / 403？**
密钥不对或没写入对应环境变量。检查 `env_key` 的变量名和实际设置的变量名是否一致。

**报模型不存在？**
`model` 字段填的模型名和中转站提供的不一致，去中转站后台确认准确的模型 ID。

**想同时保留官方和第三方？**
在 CC Switch 里保存为不同的"项目（Project）"，之后从顶部项目切换器一键整体切换。

## 相关链接

| 资源 | 地址 |
| --- | --- |
| Codex 仓库 | https://github.com/openai/codex |
| Codex 文档 | https://developers.openai.com/codex |
| Codex 网页版 | https://chatgpt.com/codex |
| CC Switch 官网 | https://ccswitch.io |
| CC Switch 仓库 | https://github.com/farion1231/cc-switch |
| CC Switch 下载 | https://github.com/farion1231/cc-switch/releases |
| CC Switch CLI | https://github.com/SaladDay/cc-switch-cli |