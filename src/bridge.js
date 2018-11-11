import Ractive from 'ractive';
import { fromEventPattern } from 'rxjs';

export default class RactiveBridge extends Ractive {
  observeStream(eventName) {
    return fromEventPattern(
      (h) => { this.observe(eventName, h) },
    );
  }

  onStream(eventName) {
    return fromEventPattern(
      (h) => { this.on(eventName, h) },
      (h) => { this.off(eventName, h) },
      (context) => ({
        context,
        arguments: Array.prototype.slice.call(arguments, 1)
      }),
    )
  }
}

