package com.safaria.backend.service;


import com.safaria.backend.DTO.*;
import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.ChatRepository;
import com.safaria.backend.repository.TourProviderRepository;
import com.safaria.backend.repository.TouristRepository;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class services implements Iservices {

    public static String decryptAES(String encryptedText) {
        String SECRET_KEY="dsvbsduf76A1xZ9g";
        String IV="1234567890123456";
        try {
            // Base64 decode the encrypted text
            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);

            // Initialize AES Cipher (CBC mode, PKCS5Padding)
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes("UTF-8"), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(IV.getBytes("UTF-8"));

            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);

            // Perform decryption
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
            return new String(decryptedBytes, "UTF-8");

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public boolean isPdfOrImage(MultipartFile file) {
        // Get content type from the file
        String contentType = file.getContentType();

        // Check for PDF or image MIME types
        if (contentType != null) {
            if (contentType.equals("application/pdf")) {
                return true;  // It's a PDF
            } else if (contentType.startsWith("image/")) {
                return false;  // It's an image (jpeg, png, gif, etc.)
            }
        }
        return false;  // Neither PDF nor image
    }


    @Autowired
    private TouristRepository touristRepository;
    @Autowired
    private TourProviderRepository tourProviderRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CheckEmailService checkEmailService;
    @Autowired
     private  FileSystemService fileSystemService;
    @Autowired
    private ChatRepository chatRepository;


    // @Override
    // public ResponseEntity<UserInfoDTO> touristlogin(String email, String password) {
    //     Optional<Tourist> tourist = touristRepository.findByEmail(email);
        

    //     if (tourist.isPresent()) {
    //             if (passwordEncoder.matches(password, tourist.get().getPassword())) {
    //                 UserInfoDTO dto = new UserInfoDTO(tourist.get());
    //                 dto.setType("Tourist");

    //                 return ResponseEntity.status(200).body(dto);
    //             } else {
    //                 return ResponseEntity.status(404).build();
    //             }

    //     }
    //     return ResponseEntity.status(404).build();
    
    // }
    // @Override
    // public ResponseEntity<UserInfoDTO>  tourProviderlogin(String email, String password) {
       
    //     Optional<TourProvider> tourProvider = tourProviderRepository.findByEmail(email);
        

    //     if (tourProvider.isPresent()) {
    //             if (passwordEncoder.matches(password, tourProvider.get().getPassword())) {
    //                 UserInfoDTO dto = new UserInfoDTO(tourProvider.get());
    //                 if(tourProvider.get().getType())
    //                   dto.setType("Tour Guide");
    //                 else
    //                   dto.setType("Company");


    //                 return ResponseEntity.status(200).body(dto);
    //             } else {
    //                 return ResponseEntity.status(404).build();
    //             }


       
     @Override
     public ResponseEntity<Admin> adminlogin(String email, String password) {

    //     email=URLDecoder.decode(email, StandardCharsets.UTF_8);
    //     password=URLDecoder.decode(password, StandardCharsets.UTF_8);
    //     try {
    //         email=decryptAES(email);
    //         password=decryptAES(password);
    //     }catch (Exception e){System.out.println(e.getMessage());}
        Optional<Admin> admin = adminRepository.findByEmail(email);
         if (admin.isPresent()) {
             if (passwordEncoder.matches(password, admin.get().getPassword())) {

                 return ResponseEntity.status(200).body(admin.get());
             } else {
                 return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
             }

        }
         return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

     }
    @Override

    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist) {
        
        if (!checkEmailService.isValidEmailDomain(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(touristRepository.existsByEmail(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourist Email is already registered!");
        tourist.setPassword(passwordEncoder.encode(tourist.getPassword()));
        touristRepository.save(new Tourist(tourist));
        return ResponseEntity.status(200).body("DONE Tourist SignedUP");
        
    }
    @Override
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider, Boolean isTourGuide) {
       
        if (!checkEmailService.isValidEmailDomain(tourProvider.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(tourProviderRepository.existsByEmail(tourProvider.getEmail()))
        return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourProvider Email is already registered!");

        tourProvider.setPassword(passwordEncoder.encode(tourProvider.getPassword()));
        String directory = "Documents/TourProvider";
        String uniqueFileName="";
        if(isPdfOrImage(tourProvider.getApprovalDocument())){
            uniqueFileName = this.fileSystemService.generateUniqueFileName(directory, "pdf");
        }
        else{
            uniqueFileName = this.fileSystemService.generateUniqueFileName(directory, "jpg");

        }
        String relativeFilePath = Paths.get(directory, uniqueFileName).toString();

        try {

            this.fileSystemService.storeFile(tourProvider.getApprovalDocument().getBytes() ,relativeFilePath);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        tourProviderRepository.save(new TourProvider(tourProvider,relativeFilePath,isTourGuide));

        
        

     
        return ResponseEntity.status(200).body("DONE TourProvider SignedUP");
        
    }

    @Override
    public Optional<List<TourProviderRequestDTO>> getPendingProviders() {
        Optional<List<TourProvider>>pendingProviders=this.tourProviderRepository.findByIsApproved(false);
        List<TourProviderRequestDTO> pending=new ArrayList<TourProviderRequestDTO>();
        pendingProviders.ifPresent(list -> {
            for (TourProvider T : list) {
                TourProviderRequestDTO t=new TourProviderRequestDTO();
                t.setId(T.getUserId());
                t.setName(T.getUsername());
                t.setEmail(T.getEmail());
                t.setType(T.getType()? "tourguide":"company");
                t.setDocumentUrl(T.getApprovalDocumentPath());
                t.setStatus("pending");
                t.setSubmittedAt(T.getDate().toInstant());
                pending.add(t);
            }
        });
        return Optional.ofNullable(pending);
    }

    @Override
    public ResponseEntity<String> deleteTourProvider(Integer id) {
        this.tourProviderRepository.deleteById(id);
        return ResponseEntity.ok().body("Provider Disapproved");
    }
    @Override
    public ResponseEntity<String> deleteTourist(Integer id) {
        this.touristRepository.deleteById(id);
        return ResponseEntity.ok().body("Provider Disapproved");
    }
    @Override
    public ResponseEntity<String> approveTourProvider(Integer id){
        Optional<TourProvider> tourProvider= this.tourProviderRepository.findById(id);
        if(tourProvider.isPresent()) {
            tourProvider.get().setIsApproved(true);
            this.tourProviderRepository.save(tourProvider.get());
            return ResponseEntity.ok().body("Tour Provider Approved");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tour Provider Not Found");
    }
    @Override
    public List<UserEditDto> getUsers(){
        Optional<List<TourProvider>>providers= Optional.of(this.tourProviderRepository.findAll());
        Optional<List<Tourist>>tourists= Optional.of(this.touristRepository.findAll());
        Optional<List<Admin>>admins= Optional.of(this.adminRepository.findAll());
        List<UserEditDto> users = new ArrayList<UserEditDto>();

        providers.ifPresent(list -> {
            for (TourProvider P : list) {
                users.add(new UserEditDto(P));
            }
        });

        tourists.ifPresent(list -> {
            for (Tourist T : list) {
                users.add(new UserEditDto(T));
            }
        });
        admins.ifPresent(list -> {
            for (Admin A : list) {
                users.add(new UserEditDto(A));
            }
        });
        Collections.shuffle(users);
        return users;
    }
    @Override
    public ResponseEntity<String> updateUser(UserEditDto user,Integer id,Integer role){
        if(role==1){
            Optional<Tourist> tourist=this.touristRepository.findById(id);
            if(tourist.isPresent()){
                tourist.get().setUsername(user.getName());
                tourist.get().setEmail(user.getEmail());
                if(user.getRole() == 1) {
                    this.touristRepository.save(tourist.get());
                }
                else if(user.getRole() == 2){
                    TourProvider provider=new TourProvider(tourist.get(),false);
                    this.tourProviderRepository.save(provider);
                    this.touristRepository.deleteById(id);
                }
                else if(user.getRole() == 3){
                    TourProvider provider=new TourProvider(tourist.get(),true);
                    this.tourProviderRepository.save(provider);
                    this.touristRepository.deleteById(id);
                }
                else{
                    Admin admin =new Admin(tourist.get());
                    this.adminRepository.save(admin);
                    this.touristRepository.deleteById(id);
                }
                return ResponseEntity.status(200).body("User Updated");
            }
        }
        else if(role == 2 || role ==3){
            Optional<TourProvider> provider=this.tourProviderRepository.findById(id);
            if(provider.isPresent()){
                provider.get().setUsername(user.getName());
                provider.get().setEmail(user.getEmail());
                if(user.getRole()==1){
                    Tourist tourist=new Tourist(provider.get());
                    this.touristRepository.save(tourist);
                    this.tourProviderRepository.deleteById(id);
                }
                else if(user.getRole() ==4){
                    Admin admin =new Admin(provider.get());
                    this.adminRepository.save(admin);
                    this.tourProviderRepository.deleteById(id);
                }
                else if(user.getRole() == role) this.tourProviderRepository.save(provider.get());
                else {
                    provider.get().setType(!provider.get().getType());
                    this.tourProviderRepository.save(provider.get());
                }
                return ResponseEntity.status(200).body("User Updated");
            }
        }
        else{
            Optional<Admin> admin =this.adminRepository.findById(id);
            if (admin.isPresent()) {
                admin.get().setUsername(user.getName());
                admin.get().setEmail(user.getEmail());

                if (user.getRole() == 1) {
                    this.touristRepository.save(new Tourist(admin.get()));
                    this.adminRepository.deleteById(id);
                } else if (user.getRole() == 2) {
                    TourProvider provider = new TourProvider(admin.get(), false);
                    this.tourProviderRepository.save(provider);
                    this.adminRepository.deleteById(id);
                } else if (user.getRole() == 3) {
                    TourProvider provider = new TourProvider(admin.get(), true);
                    this.tourProviderRepository.save(provider);
                    this.adminRepository.deleteById(id);
                } else {
                    this.adminRepository.save(admin.get());
                }
                return ResponseEntity.status(200).body("User Updated");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Found");
    }

    @Override
    public ResponseEntity<String> addUser(UserEditDto user){
        if(user.getRole() == 1) this.touristRepository.save(new Tourist(user));
        else if(user.getRole() == 2 || user.getRole() == 3) this.tourProviderRepository.save(new TourProvider(user));
        else this.adminRepository.save(new Admin(user));
        return ResponseEntity.status(200).body("User Added");

    }
@Override
public ResponseEntity<Optional<List<Chat>> > getMessages(MessageRequestDTO requestDTO){
    Optional<List<Chat>> messages = Optional.ofNullable(this.chatRepository.findMessagesBetweenUsers(requestDTO.getTourist_id(), requestDTO.getTour_provider_id()));
    return messages.isPresent() ? ResponseEntity.status(200).body(messages) : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
}
@Override
public ResponseEntity<String> setMessage(MessageDTO messageDTO){
         Chat chat=new Chat(messageDTO);
         this.chatRepository.save(chat);
         return ResponseEntity.status(200).body("message saved");
}
@Override
    public ResponseEntity<String> deleteMessage(Integer message_id){
         this.chatRepository.deleteById(message_id);
         return ResponseEntity.status(200).body("message deleted");
}

}

