
import type { Post } from "~/models/post.server";
import init, {
    AlignItems,
    JustifyContent,
    OGImageWriter,
    Rgba,
    Style,
    TextArea,
    WindowStyle,
} from "og_image_writer";
import invariant from "tiny-invariant";

const createRgba = (r: number, g: number, b: number, a: number) => {
    let color = Rgba.new(r, g, b, a);
    return color;
};

const fetchFont = (path: string) => {
    return fetch(path)
        .then((res) => {
            return res.arrayBuffer();
        })
        .then((data) => new Uint8Array(data));
};

const textarea = (post: Post) => {
    const textarea = TextArea.new();

    const style1 = Style.new();
    style1.color = createRgba(0, 100, 50, 255);
    style1.font_size = 100;
    textarea.push("Hello", style1);

    const style2 = Style.new();
    style2.color = createRgba(20, 25, 255, 255);
    style2.font_size = 100;
    textarea.push(" World", style2);

    return textarea;
};

export const generateImage = async (w: number, h: number, post: Post) => {
    const windowStyle = WindowStyle.new();
    windowStyle.background_color = createRgba(255, 255, 100, 255);
    windowStyle.align_items = AlignItems.Center;
    windowStyle.justify_content = JustifyContent.Center;
    windowStyle.width = w;
    windowStyle.height = h;

    const writer = OGImageWriter.new(windowStyle);

    const textareaStyle = Style.new();
    writer.set_textarea(
        textarea(post),
        textareaStyle,
        await fetchFont("/example.ttf")
    );

    writer.paint();

    return writer.into_vec();
};

export const render = async (w: number, h: number, post: Post) => {
    // initialize wasm module
    await init();

    const data = await generateImage(w, h, post);

    const canvas = document.querySelector("canvas");
    invariant(canvas, "canvas is required")
    const ctx = canvas.getContext("2d");
    invariant(ctx, "canvas needs to have context 2d")

    let imageData = new ImageData(new Uint8ClampedArray(data.buffer), w, h);

    ctx.putImageData(imageData, 0, 0);
};

// render(800, 500);