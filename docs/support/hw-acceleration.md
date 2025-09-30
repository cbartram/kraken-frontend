# Disabling Hardware Acceleration

RuneLite automatically enables hardware acceleration for Java 2D rendering. This can cause artifacting of the side panel,
particularly on Windows, and can be fixed by doing one of the following:

- Removing external programs that interfere with RuneLite
- Removing GPU overlay programs cause this problem; usually, removing them is the best option
    - rivatuner
    - sonic suite
    - cFosSpeed
    - alienware command center
    - LogiOverlay
    - NZXT CAM (must be closed and computer restarted)
    - Wallpaper engine
    - NVIDIA GeForce Experience
    - Nahimic
    - Sonic Studio
    - MSI Afterburner
    - Sonic radar 3
    - GPU TWEAK III - ASUS

## Disabling hardware acceleration

Select OFF in the dropdown menu for Hardware acceleration inside the configuration window (refer to the image below) 
launched by using the "RuneLite (configure)" shortcut. For Windows, this can be quickly found by searching for it in the Start menu.

![launcher](../images/windows-launcher.png)

## Anti Aliasing

If disabling HWA didn't resolve your issue, try disabling the 'Anti Aliasing' option within the GPU plugin.