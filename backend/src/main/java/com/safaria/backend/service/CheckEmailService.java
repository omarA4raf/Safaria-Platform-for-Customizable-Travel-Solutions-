package com.safaria.backend.service;

import org.xbill.DNS.Lookup;
import org.xbill.DNS.Record;
import org.xbill.DNS.Type;

@org.springframework.stereotype.Service
public class CheckEmailService {

    public boolean isValidEmailDomain(String email) {
        String domain = email.substring(email.indexOf("@") + 1);
        try {
            Record[] records = new Lookup(domain, Type.MX).run();
            return records != null && records.length > 0;
        } catch (Exception e) {
            return false;
        }
    }

}
