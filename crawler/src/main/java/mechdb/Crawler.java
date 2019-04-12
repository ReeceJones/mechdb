package mechdb;

import mechdb.PriceLookupService;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.core.Application;

public class Crawler extends Application {
    private final Set<Class<?>> classes;

    public Crawler() {
        HashSet<Class<?>> c = new HashSet<Class<?>>();
        c.add(PriceLookupService.class);
        classes = Collections.unmodifiableSet(c);
    }

    @Override
    public Set<Class<?>> getClasses() {
        return classes;
}
}
